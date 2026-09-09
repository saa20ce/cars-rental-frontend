import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
function load(file, env = {}, mocks = {}, globals = {}) {
    const code = ts.transpileModule(readFileSync(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    const context = {
        exports: {}, process: { env }, URL, Response, Request, Buffer, console, setTimeout,
        require: name => mocks[name] ?? require(name), ...globals,
    };
    vm.runInNewContext(code, context);
    return context.exports;
}

test('WordPress TTL floor, stable keys, overrides and uncached mutations', async () => {
    let last;
    const globals = { fetch: async (url, options) => {
        last = { url, options };
        return new Response('[]');
    } };
    for (const mode of ['development', 'production']) {
        const api = load('lib/api/wpCache.ts', { NODE_ENV: mode, WP_CACHE_REVALIDATE_SECONDS: '300' }, {}, globals);
        await api.wpFetch('https://example.org/cars', { next: { revalidate: 60 } });
        assert.equal(last.options.next.revalidate, 86400);
        const firstUrl = last.url;
        await load('lib/api/wpCache.ts', { NODE_ENV: mode }, {}, globals).wpFetch('https://example.org/cars');
        assert.equal(last.url, firstUrl);
        for (const init of [{ method: 'POST' }, { cache: 'no-store' }, { next: { revalidate: 0 } }]) {
            await api.wpFetch('https://example.org/cars', init);
            assert.equal(last.options.cache, 'no-store');
            assert.equal(last.options.next, undefined);
        }
        await api.wpFetch('https://example.org/cars', { next: { revalidate: 172800 } });
        assert.equal(last.options.next.revalidate, 172800);
    }
});

test('Refresh requires authentication, invalidates caches, and paginates inventory', async () => {
    const invalidated = [];
    let upstreamUrl;
    const api = load('app/api/cache/refresh/route.ts', {
        CACHE_REFRESH_SECRET: 'test-secret', NEXT_PUBLIC_WP_API_URL: 'https://example.org/wp-json/wp/v2',
    }, {
        'next/cache': {
            revalidateTag: tag => invalidated.push(tag),
            revalidatePath: path => invalidated.push(path),
        },
        '@/lib/api/wpCache': { wpFetch: async url => {
            upstreamUrl = url;
            return Response.json([{ slug: 'car-two' }], { headers: { 'x-wp-totalpages': '3' } });
        } },
    });
    const request = (body, token = 'test-secret') => new Request('http://localhost/api/cache/refresh', {
        method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify(body),
    });
    assert.equal((await api.POST(request({ action: 'invalidate' }, 'wrong'))).status, 401);
    assert.equal(invalidated.length, 0);
    assert.equal((await api.POST(request({ action: 'invalidate' }))).status, 200);
    assert.deepEqual(invalidated, ['wordpress', 'django', '/']);
    assert.equal((await api.POST(request(null))).status, 400);
    assert.equal((await api.POST(request({ action: 'inventory', page: -1 }))).status, 400);
    const result = await api.POST(request({ action: 'inventory', page: 2 }));
    assert.equal(result.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await result.json(), { slugs: ['car-two'], totalPages: 3 });
    assert.equal(new URL(upstreamUrl).searchParams.get('page'), '2');
});

for (const failPage of [false, true]) {
    test(`Refresh command warms every inventory page and reports failures (${failPage})`, async () => {
        const visited = [];
        let invalidated = false;
        const server = createServer(async (req, res) => {
            if (req.method === 'POST') {
                assert.equal(req.headers.authorization, 'Bearer test-secret');
                let raw = '';
                for await (const chunk of req) raw += chunk;
                const body = JSON.parse(raw);
                if (body.action === 'invalidate') {
                    invalidated = true;
                    res.end('{}');
                } else {
                    assert.equal(invalidated, true);
                    res.end(JSON.stringify({ slugs: [`car-${body.page}`], totalPages: 2 }));
                }
            } else {
                visited.push(req.url);
                res.statusCode = failPage && req.url === '/cars/car-2' ? 500 : 200;
                res.end('<html>Page</html>');
            }
        });
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        try {
            const child = spawn(process.execPath, [
                'scripts/refresh-cache.mjs', `http://127.0.0.1:${server.address().port}`,
            ], { env: { ...process.env, CACHE_REFRESH_SECRET: 'test-secret' }, stdio: 'ignore' });
            const code = await new Promise((resolve, reject) => {
                child.on('error', reject);
                child.on('exit', resolve);
            });
            assert.equal(code, failPage ? 1 : 0);
            assert.deepEqual(visited.sort(), ['/', '/cars', '/cars/car-1', '/cars/car-2']);
        } finally {
            await new Promise(resolve => server.close(resolve));
        }
    });
}
