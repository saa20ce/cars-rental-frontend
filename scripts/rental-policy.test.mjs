import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);
function load(file) {
    const context = {
        exports: {},
        require: name => name === './rentalWorkingDays'
            ? load('lib/helpers/rentalWorkingDays.ts') : require(name),
    };
    const code = ts.transpileModule(readFileSync(file, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    vm.runInNewContext(code, context);
    return context.exports;
}

test('Office pickup fees include both night boundaries and update with pickup time', () => {
    const { getDeliveryCost } = load('lib/helpers/RentalCheckoutHelper.ts');
    for (const time of ['18:59', '19:00', '23:59', '00:00', '08:58', '08:59']) {
        assert.equal(getDeliveryCost([], 'none', time), 1000, time);
    }
    for (const time of ['09:00', '09:59', '10:00', '18:58']) {
        assert.equal(getDeliveryCost([], 'none', time), 0, time);
    }
    assert.equal(getDeliveryCost([], '', '23:00'), 0);
    assert.equal(getDeliveryCost([], 'none', ''), 0);
    assert.equal(getDeliveryCost([{value: 'aeroport', price: 1500}], 'aeroport', '23:00'), 1500);
    assert.equal(getDeliveryCost([{value: 'aeroport', price: 500}], 'aeroport', '09:00'), 500);
});

test('Mileage prices and model/body/class precedence', () => {
    const { getOverMileagePrice } = load('lib/helpers/overMileagePrice.ts');
    assert.equal(getOverMileagePrice({ slug: 'arenda-tank-500-2024', klass: [269], kuzov: [242] }), 30);
    assert.equal(getOverMileagePrice({ acf: { nazvanie_avto: 'Танк 500' } }), 30);
    assert.equal(getOverMileagePrice({ slug: 'arenda-tank-300', klass: [269], kuzov: [242] }), 15);
    assert.equal(getOverMileagePrice({ klass: [268], kuzov: [243] }), 15);
    assert.equal(getOverMileagePrice({ klass: [268], kuzov: [242] }), 12);
    assert.equal(getOverMileagePrice({ klass: [267] }), 10);
    assert.equal(getOverMileagePrice({ klass: [268] }), 10);
});

test('Two-day rentals are allowed; one day is below minimum; January 1 stays closed', () => {
    const policy = load('lib/helpers/RentalCheckoutHelper.ts');
    const start = dayjs('2026-09-10');
    assert.equal(policy.MIN_RENTAL_DAYS, 2);
    assert.equal(policy.isRentalPeriodBelowMinimum(start, start.add(2, 'day'), '10:00', '10:00'), false);
    assert.equal(policy.isRentalPeriodBelowMinimum(start, start.add(1, 'day'), '10:00', '10:00'), true);
    assert.equal(policy.getRentalDaysCountWithMinimum(start, start.add(2, 'day'), '10:00', '10:00'), 2);
    assert.equal(policy.getMinimumRentalReturnDate(start).format('YYYY-MM-DD'), '2026-09-12');
    assert.equal(policy.getMinimumRentalReturnDate(dayjs('2026-12-30')).format('YYYY-MM-DD'), '2027-01-02');
    assert.equal(policy.DISCOUNT_MIN_RENTAL_DAYS, 5);
});
