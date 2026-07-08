'use client';

import React, { forwardRef } from 'react';
import { InputMask, type Track } from '@react-input/mask';

const PHONE_MASK = '+7 (___) ___-__-__';
const PHONE_REPLACEMENT = { _: /\d/ };
const RUSSIAN_COUNTRY_PREFIXES = new Set(['7', '8']);

const getDigits = (value: string) => value.replace(/\D/g, '');

const getUserDigitsFromMaskedValue = (value: string) => {
    const digits = getDigits(value);

    return digits.startsWith('7') ? digits.slice(1, 11) : digits.slice(0, 10);
};

const shouldStripCountryPrefix = (rawValue: string, digits: string) => {
    const firstDigit = digits[0];

    if (!firstDigit || !RUSSIAN_COUNTRY_PREFIXES.has(firstDigit)) return false;

    return (
        digits.length > 10 ||
        rawValue.trim().startsWith('+7') ||
        rawValue.trim().startsWith('8')
    );
};

export const normalizeRussianPhoneInput = (value: string) => {
    const digits = getDigits(value);
    const phoneDigits = shouldStripCountryPrefix(value, digits)
        ? digits.slice(1)
        : digits;

    return phoneDigits.slice(0, 10);
};

const trackRussianPhoneInput: Track = ({ inputType, data, value }) => {
    if (inputType !== 'insert' || !data) return true;

    const addedDigits = getDigits(data);

    if (!addedDigits) return data;

    const currentDigits = getUserDigitsFromMaskedValue(value);

    if (currentDigits.length === 0 && addedDigits.length === 1) {
        return RUSSIAN_COUNTRY_PREFIXES.has(addedDigits) ? null : data;
    }

    if (addedDigits.length > 1) {
        return normalizeRussianPhoneInput(data);
    }

    return data;
};

type PhoneInputMaskProps = Omit<
    React.ComponentPropsWithoutRef<typeof InputMask>,
    'mask' | 'replacement' | 'track'
>;

export const PhoneInputMask = forwardRef<HTMLInputElement, PhoneInputMaskProps>(
    (
        {
            autoComplete = 'tel',
            inputMode = 'tel',
            placeholder = '+7 ',
            type = 'tel',
            ...props
        },
        ref,
    ) => (
        <InputMask
            {...props}
            ref={ref}
            autoComplete={autoComplete}
            inputMode={inputMode}
            type={type}
            mask={PHONE_MASK}
            replacement={PHONE_REPLACEMENT}
            placeholder={placeholder}
            track={trackRussianPhoneInput}
        />
    ),
);

PhoneInputMask.displayName = 'PhoneInputMask';
