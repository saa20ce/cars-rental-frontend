import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const loadedModule = { exports: {} };
const code = ts.transpileModule(
    readFileSync('lib/seo/carMetadata.ts', 'utf8'),
    {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
        },
    },
).outputText;

vm.runInNewContext(code, {
    module: loadedModule,
    exports: loadedModule.exports,
    require,
});

const { withCurrentCarMetadata } = loadedModule.exports;
const car = {
    title: { rendered: 'Tank 300 2024' },
    acf: { nazvanie_avto: 'Tank 300 2024' },
};

test('keeps accurate WordPress metadata unchanged', () => {
    const original = {
        title: 'Аренда Tank 300 2024 | Рентасиб',
        description: 'Tank 300 для поездок по Новосибирску.',
        robots: 'index, follow',
    };

    assert.equal(withCurrentCarMetadata(original, car), original);
});

test('replaces an outdated year and a fixed price, preserving canonical and robots', () => {
    const result = withCurrentCarMetadata(
        {
            title: 'Аренда Tank 300 2023 | Рентасиб',
            description: 'Цены от 6200 руб/сутки.',
            robots: 'index, follow',
            alternates: { canonical: '/cars/arenda-tank-300' },
            openGraph: {
                title: 'Аренда Tank 300 2023',
                description: 'Цены от 6200 руб/сутки.',
            },
        },
        car,
    );

    assert.match(result.title, /Tank 300 2024/);
    assert.doesNotMatch(result.description, /6200/);
    assert.match(result.openGraph.title, /Tank 300 2024/);
    assert.doesNotMatch(result.openGraph.description, /6200/);
    assert.equal(result.robots, 'index, follow');
    assert.equal(result.alternates.canonical, '/cars/arenda-tank-300');
});

test('replaces only the outdated description when the title is accurate', () => {
    const result = withCurrentCarMetadata(
        {
            title: 'Аренда Tank 300 2024 | Рентасиб',
            description: 'Аренда от 7000 ₽/сут.',
            openGraph: { title: 'Ручной заголовок', description: 'От 7000 ₽' },
        },
        car,
    );

    assert.equal(result.title, 'Аренда Tank 300 2024 | Рентасиб');
    assert.equal(result.openGraph.title, 'Ручной заголовок');
    assert.doesNotMatch(result.description, /7000/);
    assert.doesNotMatch(result.openGraph.description, /7000/);
});

test('keeps metadata when there is no car data', () => {
    const original = { title: 'Ручной заголовок' };
    assert.equal(withCurrentCarMetadata(original, null), original);
});
