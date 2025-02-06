import { DutyDefineType } from "../../../types/characters";
import { define, DefineScheme } from "../../../types/define";

export const Duty = define({
  Hero: {
    name: "主人公",
    rules: [
      "感情移入できる",
      "確かな動機や力強い欲求の延長に目的がある",
      "弱点がある",
    ],
  },
  Enemy: {
    name: "敵対者",
    rules: [
      "現時点の主人公より強い",
      "主人公との対立軸が明確で葛藤を与える存在である",
      "プレイヤーをその気にさせる",
      "対立軸例：環境・対人・利害相反・価値観",
      "強さ：物語全体なら絶対的、小さいドラマなら相対的",
    ],
  },
  Buddy: {
    name: "相棒",
    rules: [
      "基本主人公と同行",
      "主人公の行動と魅力を引き出す存在",
      "主人公と真逆の要素を備える",
    ],
  },
  Mentor: {
    name: "援助者",
    rules: [
      "主人公の旅立ち・挫折を助ける存在",
      "基本主人公と同行しない：居場所固定、別行動、途中退場、神出鬼没",
      "使いどころの予想がつく事、主人公に与えるものや試練の予想がつくことが重要",
    ],
  },
} as const satisfies DefineScheme<DutyDefineType>);
