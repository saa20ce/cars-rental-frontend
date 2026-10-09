const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
        },
    });
    module._compile(outputText, filename);
};

const dayjs = require('dayjs');
const { getSeasonDatesForCar } = require('../lib/helpers/carSeasonDates.ts');
const { isDaySeason } = require('../lib/helpers/RentalCheckoutHelper.ts');

const wpDates = {
    'season-winter-start': '10/12/2025',
    'season-winter-end': '20/01/2025',
    'season-summer-start': '14/05/2025',
    'season-summer-end': '31/08/2025',
};

for (const passengers of ['7', '9']) {
    const dates = getSeasonDatesForCar(
        { kuzov: [243], acf: { passengers } },
        wpDates,
    );
    assert.equal(dates['season-winter-start'], '10/11/2025');
    assert.equal(dates['season-winter-end'], '28/02/2025');

    for (const [date, expected] of [
        ['2026-11-09', false],
        ['2026-11-10', true],
        ['2026-12-09', true],
        ['2027-01-20', true],
        ['2027-01-21', true],
        ['2027-02-28', true],
        ['2027-03-01', false],
        ['2028-02-28', true],
        ['2028-02-29', false],
    ]) {
        assert.equal(
            isDaySeason(dayjs(date), dates),
            expected,
            `${date}, ${passengers} seats`,
        );
    }
}

const otherCarDates = getSeasonDatesForCar({ kuzov: [244] }, wpDates);
assert.equal(isDaySeason(dayjs('2026-11-10'), otherCarDates), false);
assert.equal(isDaySeason(dayjs('2026-12-10'), otherCarDates), true);
assert.equal(isDaySeason(dayjs('2027-01-21'), otherCarDates), false);
assert.equal(wpDates['season-winter-start'], '10/12/2025');
assert.equal(wpDates['season-winter-end'], '20/01/2025');

console.log('Season boundary checks passed');
