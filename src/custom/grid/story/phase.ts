import { define, DefineScheme } from "../../../types/define";
import { ScenarioTheoryDefineType } from "../../../types/scenario";

export const Phase = define({
  Intro: {
    name: "掴み",
    summary: "なぜ主人公は行動を起こすことになったのか？",
    checklist: [
      "舞台となる世界や環境、時代背景は明確か？",
      "主人公の姿・性格・現在の状況がわかるか？",
      "主人公が動き出すきっかけ（事件/依頼/異変）は何か？",
      "主人公が追い求める“目的”は何か？ それは十分に背中を押す動機となっているか？",
      "物語全体の方向性やトーンがここで示されているか？",
    ],
  },
  Happening: {
    name: "様々な事件",
    summary: "成長のためにどんなことがあったのか？",
    checklist: [
      "事件のラインナップは整理できているか？（箇条書き可）",
      "事件同士に因果関係があるか？（一つの出来事が次の出来事を呼び起こす）",
      "シーンやエピソードが連鎖しているか？",
    ],
  },
  Crisis: {
    name: "危機",
    summary: "なぜ目的達成意欲に駆られたのか？",
    checklist: [
      "主人公の目的達成が難しくなる強烈な障害や葛藤は用意されているか？",
      "主人公の感情を大きく揺さぶるイベントはあるか？",
      "「なぜ主人公はここまで頑張れるのか？」を再確認できる描写はあるか？",
    ],
  },
  Climax: {
    name: "結末",
    summary: "なぜ様々な困難を乗り越え、今があるのか？",
    checklist: [
      "主人公がどう成長・変化したか明確になっているか？",
      "最後の対決・解決は物語上必然の流れに乗っているか？",
      "読者・視聴者に達成感や余韻を与えるフィニッシュになっているか？",
    ],
  },
} as const satisfies DefineScheme<ScenarioTheoryDefineType>);
