import { Character } from "./custom/define/characters/character";
import { Episode } from "./custom/define/stories/episode";
import { Phase } from "./custom/define/stories/phase";
import { Piece } from "./custom/define/stories/piece";
import { Story } from "./custom/define/stories/story";
import { ControllerType } from "./types/controls";
import { MusicAsset, SoundAsset } from "./types/messages";

interface Defines {
  Character: typeof Character;
  Story: typeof Story;
  Phase: typeof Phase;
  Episode: typeof Episode;
  Piece: typeof Piece;
}

export type ScriptCallback = ($: Script, x: Defines) => Script;

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
    this.code = code(this, {
      Character,
      Story,
      Phase,
      Episode,
      Piece,
    } as unknown as Defines).code;
  }

  get isInstant() {
    return this.meta.name === INSTANT;
  }

  head(meta?: Partial<ScriptMetadata>) {
    if (this.calledCount !== 0)
      throw new Error("$.head は最初に定義してください");
    this.calledCount++;
    this.isHeadCalled = true;
    this.meta = { ...this.meta, ...(meta ?? {}) };
    return this;
  }
  z(args: ControllerType["Message"]["Show"]) {
    return this.do("Message", "Show", args);
  }
  do<A extends keyof ControllerType, B extends keyof ControllerType[A]>(
    category: A,
    method: B,
    args: ControllerType[A][B]
  ) {
    if (!this.isHeadCalled)
      throw new Error("$.head を最初に必ず呼んでください");
    this.calledCount++;
    return this;
  }
  customMessage(content) {
    return this;
  }
  _DEMO_CODE() {
    new Script(($, x) =>
      $.head({ name: "デモコード" })
        .z({
          chara: x.Character.Alex,
          mes: [
            "ああああああああああああ",
            "いいいいいいいいいいいい",
            "うううううううううううう",
          ],
        })
        .z({ chara: x.Character.Alex, mes: ["はっ！"] })
        .do("Audio", "Play", { media: null as MusicAsset })
        .do("Audio", "Play", { media: null as SoundAsset })
    );
  }
}
