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

test('Today excludes past hours, while future dates keep all hours available', () => {
    const { getRentalTimeOptions, isPastRentalTime } = load('lib/helpers/rentalTime.ts');
    const now = dayjs('2026-10-07T15:40:00');
    const options = getRentalTimeOptions(now.startOf('day'), now);
    assert.equal(options.find(option => option.value === '12:00').disabled, true);
    assert.equal(options.find(option => option.value === '15:00').disabled, true);
    assert.equal(options.find(option => option.value === '16:00').disabled, false);
    assert.equal(options.filter(option => !option.disabled).length, 8);
    assert.equal(getRentalTimeOptions(now.add(1, 'day'), now).some(option => option.disabled), false);
    assert.equal(getRentalTimeOptions(null, now).some(option => option.disabled), false);
    assert.equal(isPastRentalTime(now, '16:00', dayjs('2026-10-07T16:00:01')), true);
});

test('Expired selections advance to the next hour, including midnight and office closures', () => {
    const { getNextRentalHour, getRentalTimeOptions } = load('lib/helpers/rentalTime.ts');
    for (const [current, expected] of [
        ['2026-10-07T15:10:00', '2026-10-07 16:00'],
        ['2026-10-07T15:40:00', '2026-10-07 16:00'],
        ['2026-10-07T16:00:00', '2026-10-07 16:00'],
        ['2026-10-07T23:40:00', '2026-10-08 00:00'],
        ['2026-12-31T23:40:00', '2027-01-02 00:00'],
    ]) {
        assert.equal(getNextRentalHour(dayjs(current)).format('YYYY-MM-DD HH:mm'), expected);
    }
    const late = dayjs('2026-10-07T23:40:00');
    assert.equal(getRentalTimeOptions(late, late).every(option => option.disabled), true);
});

test('Office after-hours fees are separate from delivery costs', () => {
    const { getAfterHoursCost, getDeliveryCost, getDeliveryCostForTime } = load('lib/helpers/RentalCheckoutHelper.ts');
    for (const time of ['18:59', '19:00', '23:59', '00:00', '08:58', '08:59']) {
        assert.equal(getAfterHoursCost('none', time), 1000, time);
    }
    for (const time of ['09:00', '09:59', '10:00', '18:58']) {
        assert.equal(getAfterHoursCost('none', time), 0, time);
    }
    assert.equal(getAfterHoursCost('', '23:00'), 0);
    assert.equal(getAfterHoursCost('none', ''), 0);
    assert.equal(getAfterHoursCost('none', '10:00', '20:00'), 1000);
    assert.equal(getAfterHoursCost('none', '20:00', '08:00'), 2000);
    assert.equal(getAfterHoursCost('none', '10:00', '18:58'), 0);
    assert.equal(getAfterHoursCost('aeroport', '20:00', '08:00'), 0);
    assert.equal(getDeliveryCost([], 'none'), 0);
    assert.equal(getDeliveryCost([{value: 'aeroport', price: 1500}], 'aeroport'), 1500);
    assert.equal(getDeliveryCost([{value: 'aeroport', price: 500}], 'aeroport'), 500);

    const deliveryPrice = {
        day: [{ value: 'aeroport', label: 'Аэропорт', price: 1500 }],
        night: [{ value: 'aeroport', label: 'Аэропорт', price: 2500 }],
    };
    assert.equal(getDeliveryCostForTime(deliveryPrice, 'aeroport', '10:00'), 1500);
    assert.equal(getDeliveryCostForTime(deliveryPrice, 'aeroport', '19:00'), 1500);
    assert.equal(getDeliveryCostForTime(deliveryPrice, 'aeroport', '19:01'), 2500);
    assert.equal(getDeliveryCostForTime(deliveryPrice, 'aeroport', '09:59'), 2500);
    assert.equal(getDeliveryCostForTime(deliveryPrice, 'none', '23:00'), 0);
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
