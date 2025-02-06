import { define, DefineScheme } from "../../../types/define";
import { ScenarioTheoryDefineType } from "../../../types/stories";

export const Foreshadow = define({
  Flag: {
    name: "フラグ",
    summary: "先の展開をあらかじめ予想させる伏線",
    checklist: [
      "予兆を感じさせる内容か？",
      "これをしたらどうなるか予想が付くか？",
    ],
  },
  Secret: {
    name: "秘密",
    summary: "先の展開が気になる伏線",
    checklist: [
      "発火地点では意味がわからないようになっているか？",
      "回収される時が待ち遠しく感じるか？",
    ],
  },
  FlashBack: {
    name: "フラッシュバック",
    summary: "後の展開によって覆される伏線",
    checklist: [
      "発火地点では何気なく、読者もあまり気にも留めない内容か？",
      "回収されるとそれまでの常識が覆されるような重要なものか？",
    ],
  },
} as const satisfies DefineScheme<ScenarioTheoryDefineType>);
