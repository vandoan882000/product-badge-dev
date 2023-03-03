type OptionKeys<T extends string> = T extends `${any}{{${infer U}}}${infer C}` ? Trim<U> | OptionKeys<C> : never;
type Path<T> = PathKeyOfObject<T, keyof T>;

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface I18n<T extends Record<string, any>> {
  setLocale: (locale: string) => void;
  getLocale: () => string;
  t<K extends Path<T>>(
    key: K,
    options?: OptionKeys<PathValue<T, K>> extends never
      ? { textTransform?: TextTransform }
      : { [P in OptionKeys<PathValue<T, K>>]: string } & { textTransform?: TextTransform },
  ): string;
}

export type TransitionDefault = Record<string, Record<string, any>>;
