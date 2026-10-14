import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const module = { exports: {} };
const code = ts.transpileModule(
    readFileSync('lib/seo/newsPagination.ts', 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require,
});
const { paginateNewsPosts } = module.exports;

test('archive pages are filled after unpublished or redirected posts are excluded', () => {
    const visiblePosts = Array.from({ length: 282 }, (_, id) => ({ id }));
    const eighteenth = paginateNewsPosts(visiblePosts, 18);
    const last = paginateNewsPosts(visiblePosts, 32);

    assert.equal(eighteenth.posts.length, 9);
    assert.equal(eighteenth.posts[0].id, 153);
    assert.equal(last.posts.length, 3);
    assert.equal(last.totalPages, 32);
    assert.equal(paginateNewsPosts(visiblePosts, 33), null);
});

test('empty archive keeps its first page but rejects invalid pages', () => {
    const first = paginateNewsPosts([], 1);
    assert.equal(first.posts.length, 0);
    assert.equal(first.totalPages, 1);
    assert.equal(paginateNewsPosts([], 2), null);
    assert.equal(paginateNewsPosts([1], 0), null);
    assert.equal(paginateNewsPosts([1], 1.5), null);
});
