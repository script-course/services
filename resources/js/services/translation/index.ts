import type {Translation} from './types';

import {MissingTranslationError} from 'errors/MissingTranslation';


const PLURAL = 'plural';
const SINGULAR = 'singular';

const translations: {[key: string]: Translation} = {};

const capitalizeString = (value: string) => `${value[0].toUpperCase()}${value.substring(1)}`;

const getTranslation = (key: string, pluralOrSingular: typeof PLURAL | typeof SINGULAR) => {
    const translation = translations[key];
    if (!translation) throw new MissingTranslationError(`Missing translation for ${key}`);

    return translation[pluralOrSingular];
};

export const getPluralTranslation = (key: string) => getTranslation(key, PLURAL);
export const getCapitalizedPluralTranslation = (key: string) => capitalizeString(getPluralTranslation(key));

export const getSingularTranslation = (key: string) => getTranslation(key, SINGULAR);
export const getCapitalizedSingularTranslation = (key: string) => capitalizeString(getSingularTranslation(key));

export const maybePluralizeTranslation = (count: number, key: string) => {
    const baseString = `${count} `;
    if (count === 1) return baseString + getSingularTranslation(key);

    return baseString + getPluralTranslation(key);
};

export const setTranslation = (key: string, translation: Translation) => (translations[key] = translation);
