export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const showDefaultLang = false;

export const locales: Record<Lang, string> = {
  es: 'es_ES',
  en: 'en_US',
};
