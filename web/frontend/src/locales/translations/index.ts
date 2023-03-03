import { createGlobalState } from 'react-use';
import { createI18n } from '../utils/createI18n';
import { generalEN } from './en';
import { generalVI } from './vi';

export const translation = {
  en: generalEN,
  vi: generalVI,
} as const;

const _i18n = createI18n(translation);

const useGlobalState = createGlobalState([]);

export const i18n = {
  t: _i18n.t,
};

export const useSetLocale = () => {
  const [, listener] = useGlobalState();
  const setLocale = (locale: string) => {
    _i18n.setLocale(locale);
    listener([]);
  };
  return setLocale;
};
