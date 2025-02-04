import { Piece } from "../types/stories";

export default {
  Cause: {
    name: "原因",
    summary: "何かが起こる／主人公や周囲が行動する",
    checklist: ["シーンの冒頭で「何が起きた／起こそうとした」かが分かるか？"],
  },
  Result: {
    name: "結果",
    summary: "その行動・出来事が引き起こす反応・変化",
    checklist: [
      "その行動や出来事に対して「どんな結果」が出たかハッキリ示されているか？",
    ],
  },
  Next: {
    name: "次への文脈",
    summary: "新たな課題が生まれたり、次の展開へつながる要素が提示されたりする",
    checklist: [
      "その結果が「次のシーン」にどう影響するのか（あるいは物語全体の動きをどう変えるのか）が見えているかか？",
    ],
  },
} as const satisfies Record<string, Omit<Piece, "scripts">>;
