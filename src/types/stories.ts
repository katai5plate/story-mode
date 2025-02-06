import { DetailField } from "./fields";

/** 物語要素 */
export type ScenarioTheoryDefineType = {
  /** 名称 */
  name: string;
  /** 説明や主な質問 */
  summary: DetailField;
  /** チェックリスト */
  checklist?: string[];
  /** 回答 */
  answer?: DetailField;
};

/** 小枠 */
// export interface PieceDefineType extends ScenarioTheoryDefineType {
//   // /** 実際のスクリプト内容 */
//   // scripts: {
//   //   /** 開始時に走るスクリプト */
//   //   main: Script;
//   //   /** call などで呼ばれるスクリプト */
//   //   sub: Script[];
//   // };
// }
/** 中枠 */
// export interface EpisodeDefineType extends ScenarioTheoryDefineType {
//   // /** 小枠 */
//   // pieces: Exchanged<Piece>;
// }
/** 大枠 */
// export interface PhaseDefineType extends ScenarioTheoryDefineType {
//   // /** 中枠 */
//   // episodes: Exchanged<Episode>;
// }
/** ストーリー */
// export interface StoryDefineType extends ScenarioTheoryDefineType {
//   // /** 大枠 */
//   // phases: Exchanged<Phase>;
// }
/** 伏線 */
// export interface ForeshadowDefineType extends ScenarioTheoryDefineType {
//   // /** 発生地点 */
//   // register: Piece | Episode | Phase | Story;
//   // /** 回収地点 */
//   // reclaimer: Piece | Episode | Phase | Story;
// }
