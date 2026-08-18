import {
    appendFileSync,
    readFileSync,
    statSync,
} from 'node:fs';

const url =
    process.env.FRONTEND_HEALTHCHECK_URL || 'http://127.0.0.1:3000/';

function readText(path) {
    try {
        return readFileSync(path, 'utf8').trim();
    } catch (error) {
        return `unavailable: ${error.message}`;
    }
}

function fileDetails(path) {
    try {
        const stat = statSync(path);
        return `${path} size=${stat.size} modified=${stat.mtime.toISOString()}`;
    } catch (error) {
        return `${path} unavailable: ${error.message}`;
    }
}

function rootRouteEntry() {
    try {
        const manifest = JSON.parse(
            readFileSync('.next/server/app-paths-manifest.json', 'utf8'),
        );
        return manifest['/page'] || 'missing';
    } catch (error) {
        return `unavailable: ${error.message}`;
    }
}

function emitFailure(details) {
    const prefix = '[frontend-health] ';
    const message = details
        .map((line) => `${prefix}${line}`)
        .join('\n')
        .concat('\n');

    process.stderr.write(message);
    try {
        appendFileSync('/proc/1/fd/2', message);
    } catch (error) {
        process.stderr.write(
            `${prefix}could not forward diagnostics to container stderr: ${error.message}\n`,
        );
    }
}

try {
    const response = await fetch(url, {
        headers: { 'User-Agent': 'rentasib-frontend-healthcheck' },
        signal: AbortSignal.timeout(15_000),
    });

    if (response.status === 200) {
        process.exit(0);
    }

    const body = await response.text();
    emitFailure([
        `${new Date().toISOString()} request failed: ${url}`,
        `status=${response.status}`,
        `headers=${JSON.stringify(Object.fromEntries(response.headers))}`,
        `build_id=${readText('.next/BUILD_ID')}`,
        `root_route=${rootRouteEntry()}`,
        fileDetails('.next/server/app/index.html'),
        fileDetails('.next/server/app/index.meta'),
        fileDetails('.next/server/app/index.rsc'),
        fileDetails('.next/server/app/page.js'),
        `index_meta=${readText('.next/server/app/index.meta')}`,
        `body_prefix=${body.slice(0, 1024).replaceAll(/\s+/g, ' ')}`,
    ]);
    process.exit(1);
} catch (error) {
    emitFailure([
        `${new Date().toISOString()} request errored: ${url}`,
        `error=${error.stack || error.message}`,
        `build_id=${readText('.next/BUILD_ID')}`,
        `root_route=${rootRouteEntry()}`,
        fileDetails('.next/server/app/index.html'),
        fileDetails('.next/server/app/index.meta'),
        `index_meta=${readText('.next/server/app/index.meta')}`,
    ]);
    process.exit(1);
}
