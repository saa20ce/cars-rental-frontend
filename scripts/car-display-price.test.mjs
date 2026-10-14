import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);
const modules = new Map();

function load(file) {
    const resolved = resolve(file.endsWith('.ts') ? file : `${file}.ts`);
    if (modules.has(resolved)) return modules.get(resolved).exports;

    const loadedModule = { exports: {} };
    modules.set(resolved, loadedModule);
    const code = ts.transpileModule(readFileSync(resolved, 'utf8'), {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
        },
    }).outputText;
    vm.runInNewContext(code, {
        module: loadedModule,
        exports: loadedModule.exports,
        require: (name) =>
            name.startsWith('.')
                ? load(resolve(dirname(resolved), name))
                : require(name),
    });
    return loadedModule.exports;
}

const { getCarDisplayPrice } = load('lib/helpers/carDisplayPrice.ts');
const seasonDates = {
    'season-summer-start': '01/06/2026',
    'season-summer-end': '31/08/2026',
    'season-winter-start': '10/12/2026',
    'season-winter-end': '20/01/2027',
};
const car = {
    kuzov: [],
    acf: {
        '1-3_dnya': '9000',
        '1-3_dnya_S': '13000',
        '4-9_dnej': '8000',
        '4-9_dnej_S': '12000',
        '30_dnej': '6500',
        '30_dnej_S': '9000',
    },
};

test('monthly cards use 30+ rates while ordinary cards keep short-term rates', () => {
    const today = dayjs('2026-10-14');
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'short', today).price,
        9000,
    );
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'monthly', today).price,
        6500,
    );
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'monthly', dayjs('2026-12-15'))
            .price,
        9000,
    );
});

test('weekly cards use 4–9 day rates, including seasonal rates', () => {
    const today = dayjs('2026-10-14');
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'weekly', today).price,
        8000,
    );
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'weekly', dayjs('2026-12-15'))
            .price,
        12000,
    );
});

test('weekly cards apply active discounts for a seven-day rental', () => {
    const discountedCar = {
        ...car,
        acf: {
            ...car.acf,
            skidka: '10',
            skidka_start: '2026-10-01',
            skidka_end: '2026-10-31',
        },
    };
    const result = getCarDisplayPrice(
        discountedCar,
        seasonDates,
        'weekly',
        dayjs('2026-10-14'),
    );
    assert.equal(result.price, 8000);
    assert.equal(result.discountedPrice, 7200);
    assert.equal(result.hasActiveDiscount, true);
});

test('monthly cards apply active long-rental discounts', () => {
    const discountedCar = {
        ...car,
        acf: {
            ...car.acf,
            skidka: '10',
            skidka_start: '2026-10-01',
            skidka_end: '2026-10-31',
        },
    };
    const result = getCarDisplayPrice(
        discountedCar,
        seasonDates,
        'monthly',
        dayjs('2026-10-14'),
    );
    assert.equal(result.price, 6500);
    assert.equal(result.discountedPrice, 5850);
    assert.equal(result.hasActiveDiscount, true);
});

test('minivans use their November-to-February winter dates', () => {
    const minivan = { ...car, kuzov: [243] };
    const today = dayjs('2026-11-15');
    assert.equal(
        getCarDisplayPrice(car, seasonDates, 'monthly', today).price,
        6500,
    );
    assert.equal(
        getCarDisplayPrice(minivan, seasonDates, 'monthly', today).price,
        9000,
    );
});
