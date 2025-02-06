import { Character } from "./custom/define/character/character";
import { Episode } from "./custom/define/story/episode";
import { Phase } from "./custom/define/story/phase";
import { Piece } from "./custom/define/story/piece";
import { Story } from "./custom/define/story/story";
import { ControllerType } from "./custom/commands";
import { MusicAsset, SoundAsset } from "./types/messages";

export type ScriptCallback = ($: Script) => Script;

export interface ScriptMetadata {
  name: string;
}

const INSTANT = "<instant-script>";

export class Script {
  protected meta: ScriptMetadata;
  private code: string[];
  private calledCount = 0;
  private isHeadCalled = false;

  constructor(code: ScriptCallback) {
    this.meta = {
      name: INSTANT,
    };
    this.code = code(this).code;
  }

  get _isInstant() {
    return this.meta.name === INSTANT;
  }

  readonly DATA = {
    Character,
    Story,
    Phase,
    Episode,
    Piece,
  };

  HEAD(meta?: Partial<ScriptMetadata>) {
    if (this.calledCount !== 0)
      throw new Error("$.head は最初に定義してください");
    this.calledCount++;
    this.isHeadCalled = true;
    this.meta = { ...this.meta, ...(meta ?? {}) };
    return this;
  }
  MES(args: ControllerType["Message"]["Show"]) {
    return this.DO("Message", "Show", args);
  }
  DO<A extends keyof ControllerType, B extends keyof ControllerType[A]>(
    category: A,
    method: B,
    args: ControllerType[A][B]
  ) {
    if (!this.isHeadCalled)
      throw new Error("$.head を最初に必ず呼んでください");
    this.calledCount++;
    return this;
  }
  private _DEMO_CODE() {
    new Script(($) =>
      $.HEAD({ name: "デモコード" })
        .MES({
          chara: $.DATA.Character.Alex,
          mes: [
            "ああああああああああああ",
            "いいいいいいいいいいいい",
            "うううううううううううう",
          ],
        })
        .MES({
          chara: $.DATA.Character.Alex,
          mes: [
            "はっ！", //
          ],
        })
        .DO("Audio", "Play", { media: null as MusicAsset })
        .DO("Audio", "Play", { media: null as SoundAsset })
        .DO("Debug", "Any", { json: "aaaa" })
    );
  }
}
