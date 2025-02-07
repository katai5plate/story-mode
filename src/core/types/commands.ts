declare const optionalMarker: unique symbol;
type OptionalMarker<T> = { [optionalMarker]: T };
export const opt = <T>(): OptionalMarker<T> => ({} as any);
export const req = <T>() => undefined as T;
export const defineCommands = <T>(controller: T): ExpandOptional<T> =>
  controller as any;
type ExpandOptional<T> = T extends object
  ? {
      [K in keyof T as T[K] extends OptionalMarker<any>
        ? K
        : never]?: T[K] extends OptionalMarker<infer U> ? U : never;
    } & {
      [K in keyof T as T[K] extends OptionalMarker<any>
        ? never
        : K]: T[K] extends object ? ExpandOptional<T[K]> : T[K];
    }
  : T;
