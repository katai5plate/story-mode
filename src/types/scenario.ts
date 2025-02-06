import { Episode } from "../custom/grid/story/episode";
import { Foreshadow } from "../custom/grid/story/foreshadow";
import { Phase } from "../custom/grid/story/phase";
import { Piece } from "../custom/grid/story/piece";
import { Story } from "../custom/grid/story/story";
import { Script } from "../Script";
import { Gird } from "./custom";
import { DetailField } from "./fields";

/** 物語セオリー */
export interface ScenarioGrid extends Gird {
  /** 名称 */
  name: string;
  /** 説明や主な質問 */
  summary: DetailField;
  /** チェックリスト */
  checklist?: string[];
}

/** ストーリー */
export interface StoryPlot {
  define: typeof Story;
  /** 大枠 */
  phase: typeof Episode;
}
/** 大枠 */
export interface PhasePlot {
  define: typeof Phase;
  /** 中枠 */
  episode: typeof Episode;
}
/** 中枠 */
export interface EpisodePlot {
  define: typeof Episode;
  /** 小枠 */
  piece: typeof Piece;
}
/** 小枠 */
export interface PiecePlot {
  define: typeof Piece;
  /** 実際のスクリプト内容 */
  scripts: {
    /** 開始時に走るスクリプト */
    main: Script;
    /** call などで呼ばれるスクリプト */
    sub: Script[];
  };
}
export interface ForeshadowPlot {
  define: typeof Foreshadow;
  /** 発火地点 */
  giver: StoryPlot | PhasePlot | EpisodePlot | PiecePlot;
  /** 回収地点 */
  taker: StoryPlot | PhasePlot | EpisodePlot | PiecePlot;
}
