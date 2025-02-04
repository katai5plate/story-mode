import { Script } from "../Script";
import { DetailField } from "./fields";

/** 物語要素 */
interface Theory {
  /** 名称 */
  name: string;
  /** 説明や主な質問 */
  summary: DetailField;
  /** チェックリスト */
  checklist?: string[];
  /** 回答 */
  answer?: DetailField;
}

/** 小枠 */
export interface Piece extends Theory {
  /** 実際のスクリプト内容 */
  scripts: {
    /** 開始時に走るスクリプト */
    main: Script;
    /** call などで呼ばれるスクリプト */
    sub: Script[];
  };
}
/** 中枠 */
export interface Episode extends Theory {
  /** 小枠 */
  pieces: Record<string, Piece>;
}
/** 大枠 */
export interface Phase extends Theory {
  /** 中枠 */
  episodes: Record<string, Episode>;
}
/** ストーリー */
export interface Story extends Theory {
  /** 大枠 */
  phases: Record<string, Phase>;
}
/** 伏線 */
export interface Foreshadow extends Theory {
  /** 発生地点 */
  register: Piece | Episode | Phase | Story;
  /** 回収地点 */
  reclaimer: Piece | Episode | Phase | Story;
}
