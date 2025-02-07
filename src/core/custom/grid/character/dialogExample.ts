import { DialogExampleGrid } from "../../../types/characters";
import { custom, CustomRef } from "../../../types/custom";

export const DialogExample = custom({
  Money: {
    name: "大金",
    question: "大金が当たった時の行動",
  },
  Midnight: {
    name: "夜中",
    question: "夜中の不気味な囁きとの遭遇時の行動",
  },
  Bank: {
    name: "銀行強盗",
    question: "銀行強盗が行員を人質に取っている時の行動",
  },
  Island: {
    name: "無人島",
    question: "無人島漂着時の行動",
  },
} as const satisfies CustomRef<DialogExampleGrid>);
