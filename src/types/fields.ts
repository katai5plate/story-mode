export type DetailField = string | string[];

type Jsonalue = string | number | boolean | null | JsonObject | Jsonrray;
interface JsonObject {
  [key: string | number]: Jsonalue;
}
interface Jsonrray extends Array<Jsonalue> {}
export type JsonData = JsonObject | Jsonrray;
