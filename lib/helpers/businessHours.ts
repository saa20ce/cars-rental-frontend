export const DEFAULT_SUCCESS_REQUEST_HEADER = 'Ваша заявка принята!';
export const SUCCESS_REQUEST_WORKING_HOURS_TEXT =
    'Мы свяжемся с вами в течение 5 минут';
export const SUCCESS_REQUEST_OFF_HOURS_TEXT =
    'Сейчас не работаем. Перезвоним утром';

const WEEKDAY_OPEN_HOUR_UTC = 2;
const WEEKDAY_CLOSE_HOUR_UTC = 13;
const WEEKEND_OPEN_HOUR_UTC = 2;
const WEEKEND_CLOSE_HOUR_UTC = 11;

export function isRentasibOpen(date = new Date()) {
    const day = date.getUTCDay();
    const hour = date.getUTCHours();

    const isWeekday = day >= 1 && day <= 5;
    const isWeekend = day === 0 || day === 6;

    if (isWeekday) {
        return hour >= WEEKDAY_OPEN_HOUR_UTC && hour < WEEKDAY_CLOSE_HOUR_UTC;
    }

    if (isWeekend) {
        return hour >= WEEKEND_OPEN_HOUR_UTC && hour < WEEKEND_CLOSE_HOUR_UTC;
    }

    return false;
}

export function getDefaultSuccessRequestText(date = new Date()) {
    return isRentasibOpen(date)
        ? SUCCESS_REQUEST_WORKING_HOURS_TEXT
        : SUCCESS_REQUEST_OFF_HOURS_TEXT;
}
