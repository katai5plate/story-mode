import { custom, CustomRef } from "../../../types/custom";
import { ScenarioGrid } from "../../../types/scenario";

export const Episode = custom({
  E0: {
    name: "Main",
    summary: "メインストーリー",
    checklist: [
      "主人公の欲求は何か？",
      "その欲求はどんな目的達成で満たされる？",
      "物語の最後で主人公の目的は達成される？",
    ],
  },
} as const satisfies CustomRef<ScenarioGrid>);
