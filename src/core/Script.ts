import { Character } from "./custom/writing/character";
import { Phase } from "./custom/grid/story/phase";
import { Chapter } from "./custom/grid/story/chapter";
import { Beat } from "./custom/grid/story/beat";
import { Episode } from "./custom/grid/story/episode";
import { MusicAsset, SoundAsset } from "./types/messages";
import { Commands } from "./custom/types/commands";
import { JsonData } from "./types/fields";

export type CommandsType = typeof Commands;

export type ScriptCallback = ($: Script) => Script;

export interface ScriptMetadata {
  name: string;
}

const INSTANT = "<instant-script>";

interface CodeElement<T extends JsonData = JsonData> {
  category: string;
  method: string;
  args: T;
}

export class Script {
  protected _meta: ScriptMetadata;
  private _code: CodeElement[];
  private _calledCount = 0;
  private _isHeadCalled = false;

  constructor(code: ScriptCallback) {
    this._meta = {
      name: INSTANT,
    };
    this._code = code(this)._code;
  }

  get _isInstant() {
    return this._meta.name === INSTANT;
  }

  readonly REF = {
    Character,
    Episode,
    Chapter,
    Phase,
    Beat,
  };

  Head(meta?: Partial<ScriptMetadata>) {
    if (this._calledCount !== 0)
      throw new Error("$.head は最初に定義してください");
    this._calledCount++;
    this._isHeadCalled = true;
    this._meta = { ...this._meta, ...(meta ?? {}) };
    return this;
  }
  Mes(args: CommandsType["Message"]["Show"]) {
    return this.Do("Message", "Show", args);
  }
  Do<A extends keyof CommandsType, B extends keyof CommandsType[A]>(
    category: A,
    method: B,
    args: CommandsType[A][B]
  ) {
    if (!this._isHeadCalled)
      throw new Error("$.head を最初に必ず呼んでください");
    this._calledCount++;
    this._code.push({
      category,
      method: method as string,
      args: args as JsonData,
    });
    return this;
  }

  // これはデモコード
  _() {
    new Script(($) =>
      $.Head({ name: "demo" })
        .Mes({
          chara: $.REF.Character.Alex,
          mes: [
            "ああああああああああああ",
            "いいいいいいいいいいいい",
            "うううううううううううう",
          ],
        })
        .Mes({
          chara: $.REF.Character.Alex,
          mes: [
            "はっ！", //
          ],
        })
        .Do("Audio", "Play", { media: null as MusicAsset })
        .Do("Audio", "Play", { media: null as SoundAsset })
        .Do("Debug", "Any", { json: "aaaa" })
    );
  }
}
