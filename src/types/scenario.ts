import { Phase } from "../custom/grid/story/phase";
import { Chapter } from "../custom/grid/story/chapter";
import { Beat } from "../custom/grid/story/beat";
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

export interface Plot extends ScenarioGrid {
  /** チェックリストのアンサー */
  answer?: string[];
}

export type Book<K, T> = Record<keyof K, T>;

/** エピソード */
export interface EpisodePlot extends Plot {
  /** 大枠 */
  chapter?: Book<typeof Chapter, ChapterPlot>;
}
/** 大枠 */
export interface ChapterPlot extends Plot {
  /** 中枠 */
  phase?: Book<typeof Phase, PhasePlot>;
}
/** 中枠 */
export interface PhasePlot extends Plot {
  /** 小枠 */
  beat?: Book<typeof Beat, BeatPlot>;
}
/** 小枠 */
export interface BeatPlot extends Plot {
  /** 実際のスクリプト内容 */
  scripts: {
    /** 開始時に走るスクリプト */
    main: Script;
    /** call などで呼ばれるスクリプト */
    sub: Script[];
  };
}
export interface ForeshadowPlot extends Plot {
  /** 発火地点 */
  giver?: EpisodePlot | ChapterPlot | PhasePlot | BeatPlot;
  /** 回収地点 */
  taker?: EpisodePlot | ChapterPlot | PhasePlot | BeatPlot;
}
