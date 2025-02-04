import DIALOG_EXAMPLES from "../defines/characters/DIALOG_EXAMPLES";
import { DetailField } from "./fields";

/** キャラクター情報 */
export interface Character {
  /** 名前 */
  name: string;
  /** 基礎情報 */
  basic: {
    /** 性別 */
    gender: string;
    /** 年齢 */
    age: number | string;
    /** 身長 */
    height: number | string;
    /** 体重 */
    weight: number | string;
    /** 体型 */
    body: DetailField;
  };
  /** 成長情報 */
  experience: {
    /** 仕事や趣味 */
    workAndHoby: {
      /** 内容 */
      detail: DetailField;
      /** 日常風景 */
      dailyLife: DetailField;
      /** 特技・技術・教養・知識・経験 */
      skills: DetailField;
      /** 社会的立ち位置 */
      socialRelationships: DetailField;
    };
    /** 役割 */
    duty: Duty;
    /** 経歴と現在 */
    histories: CharacterHistory[];
    /** セリフ例 */
    dialogExamples: Record<keyof typeof DIALOG_EXAMPLES, DialogExample>;
  };
  appendix?: {
    /** 特徴 */
    features?: DetailField;
    /** その他メモ */
    memo?: DetailField;
  };
  // system: {
  //   messageSpeed: MessageSpeed;
  //   messageSound: MessageSound;
  //   messageFont: MessageFont;
  // }
}

/** 役割 */
export interface Duty {
  /** 名称 */
  name: string;
  /** ルール */
  rules: DetailField;
}

/** 経歴と現在 */
export interface CharacterHistory {
  /** 名称 */
  name: string;
  /** 容姿。イメージ通りで、見分けがつき、魅力があるかチェックする */
  appearance: DetailField;
  /** 性格 */
  personality: {
    /** 基礎的な性格。エニアグラムを参考に */
    basic: DetailField;
    /** 基礎と反する性格 */
    different: DetailField;
    /** その理由 */
    reason: DetailField;
  };
  /** 弱点。すぐ覚えやすく、理解しやすく、致命的かどうかチェックする
   *
   * 例：コンプレックス、制限、恐怖、秘密、ハンデ（肉体・精神）、保護対象 */
  weakness: DetailField;
  /** 欲求 */
  desire: {
    /** 欲求の内容 */
    detail: DetailField;
    /** 動機。例：本能、夢、目標、願望 */
    motivation: DetailField;
    /** 好き嫌い */
    likesAndDislikes: DetailField;
  };
  /** その他メモ */
  note?: DetailField;
}

/** セリフ・行動例 */
export interface DialogExample {
  /** 名称 */
  name: string;
  /** お題 */
  question: DetailField;
  /** セリフ・行動 */
  answer?: DetailField;
  /** コツ */
  hint?: DetailField;
}
