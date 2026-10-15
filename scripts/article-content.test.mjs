import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const loadedModule = { exports: {} };
const code = ts.transpileModule(
    readFileSync('lib/seo/articleContent.ts', 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } },
).outputText;

vm.runInNewContext(code, {
    module: loadedModule,
    exports: loadedModule.exports,
    require,
});

const { removeLegacyCarCatalogue } = loadedModule.exports;

test('removes only the embedded all-cars catalogue after the article', () => {
    const html = '<p>Текст статьи</p><div class="ya-share2"></div>' +
        '<div class="filter-blog"><ul class="ajax_cat_list"><li cat_id="all">Все авто</li></ul></div>' +
        '<div class="post_list"><section><div class="postik-list">' +
        '<a href="https://staged.rentasib.ru/cars/arenda-tank-300-2025/">Tank 300</a>' +
        '</div></section></div><p>После блока</p>';

    const result = removeLegacyCarCatalogue(html);
    assert.match(result, /Текст статьи/);
    assert.match(result, /ya-share2/);
    assert.match(result, /После блока/);
    assert.doesNotMatch(result, /filter-blog|post_list|Tank 300/);
});

test('leaves unrelated filters and lists untouched', () => {
    const html = '<div class="filter-blog"><ul class="ajax_cat_list"><li cat_id="other">Новости</li></ul></div>' +
        '<div class="post_list"><a href="/blog/example">Статья</a></div>';

    assert.equal(removeLegacyCarCatalogue(html), html);
});
