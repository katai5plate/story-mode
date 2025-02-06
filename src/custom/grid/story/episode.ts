import { define, DefineScheme } from "../../../types/define";
import { ScenarioTheoryDefineType } from "../../../types/scenario";

export const Episode = define({
  Purpose: {
    name: "目的",
    summary: "実現しようと目指すことは？",
    checklist: [
      "このエピソードの主人公（または焦点キャラ）の「目的」は何か？",
      "その目的を達成するために必要な要素は？ (道具・情報・協力者・特殊ルールなど)",
      "非常識ルール（制約・賞罰・時間制限など）は設定されているか？ どの程度強制力があるか？",
    ],
  },
  Conflict: {
    name: "対立",
    summary: "目的の達成を阻む障害や対立は？",
    checklist: [
      "敵対者 or 障害となる存在は誰(何)か？",
      "対立する理由や背景は十分か？（納得感があるか？）",
      "主人公側と敵対者側、それぞれの思惑がぶつかっているか？",
    ],
  },
  Worries: {
    name: "悩み",
    summary: "障害への対応にどんな苦悩を抱える？",
    checklist: [
      "主人公や仲間が抱えるジレンマ・不安・迷いは何か？",
      "ここでサポート役・相棒の存在やアドバイスは登場するか？",
      "感情移入や共感が得られる人間ドラマが描かれているか？",
    ],
  },
  Decision: {
    name: "決断",
    summary: "どのように迷いを乗り越え、答えを出して実行に移る？",
    checklist: [
      "援助者の助言・報酬・目的再確認など、背中を押すきっかけは用意されているか？",
      "主人公(焦点キャラ)が「次に進む/戦う/協力する」と決断する瞬間が分かりやすいか？",
      "この決断が次の展開にどうつながるのか示されているか？",
    ],
  },
} as const satisfies DefineScheme<ScenarioTheoryDefineType>);
