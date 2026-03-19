import { ui } from './ui';
import { languages, defaultLang, showDefaultLang, type Lang } from './config';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return (ui[lang][key] ?? ui[defaultLang][key]) as string;
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang): string {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}

export function getRouteFromUrl(url: URL): string | undefined {
  const langList = Object.keys(languages);
  const parts = url.pathname.split('/');
  const pathWithoutLang = langList.includes(parts[1])
    ? parts.slice(2).join('/')
    : parts.slice(1).join('/');
  return pathWithoutLang || undefined;
}
