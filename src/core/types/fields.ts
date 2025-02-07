export type DetailField = string | string[];

type JsonValue = string | number | boolean | null | JsonObject | Jsonrray;
interface JsonObject {
  [key: string | number]: JsonValue;
}
interface Jsonrray extends Array<JsonValue> {}
export type JsonData = JsonValue | JsonObject | Jsonrray;
