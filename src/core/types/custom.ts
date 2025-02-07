type Customized<T extends Record<string, any>> = {
  [K in keyof T]: T[K] & { id: K };
};

export type CustomRef<T> = Record<string, T>;

export const custom = <T extends Record<string, any>>(data: T): Customized<T> =>
  Object.entries(data).reduce((obj, [k, v]) => {
    obj[k] = { ...v, id: k };
    return obj;
  }, {} as Record<string, unknown>) as any as Customized<T>;

export interface Gird {}
export interface Template {}
