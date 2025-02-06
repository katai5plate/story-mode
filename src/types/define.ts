export type Defined<T extends Record<string, any>> = {
  [K in keyof T]: T[K] & { id: K };
};

export type DefineScheme<T> = Record<string, T>;

export const define = <T extends Record<string, any>>(data: T): Defined<T> =>
  Object.entries(data).reduce((obj, [k, v]) => {
    obj[k] = { ...v, id: k };
    return obj;
  }, {} as Record<string, unknown>) as any as Defined<T>;
