import { define, DefineScheme } from "../../../types/define";
import { ScenarioTheoryDefineType } from "../../../types/stories";

export const Story = define({
  Main: {
    name: "メインストーリー",
    summary: "主人公の物語",
    checklist: [
      "主人公の欲求は何か？",
      "その欲求はどんな目的達成で満たされる？",
      "物語の最後で主人公の目的は達成される？",
    ],
  },
} as const satisfies DefineScheme<ScenarioTheoryDefineType>);
