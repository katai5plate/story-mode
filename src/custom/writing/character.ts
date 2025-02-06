import { CharacterTemplate } from "../../types/characters";
import { custom, CustomRef } from "../../types/custom";
import { dialogExamples } from "../../utils";
import { Duty } from "../grid/character/duty";

export const Character = custom({
  Alex: {
    name: "アレックス",
    duty: Duty.Hero,
    basic: {
      gender: "男",
      age: 20,
      height: 170,
      weight: 75,
      body: "標準体型",
    },
    experience: {
      workAndHoby: {
        detail: "勇者",
        dailyLife: "普段は街の見回り",
        skills: "剣術に長けている",
        socialRelationships: "王直属の騎士として有名",
      },
      histories: [
        {
          name: "現在",
          appearance: "勇者っぽい恰好",
          personality: {
            basic: "完璧主義者",
            different: "サボるための行動だけ徹底する",
            reason: "バレたときひどいことになった",
          },
          weakness: "童貞",
          desire: {
            detail: "隣国の勇者みたいにモテモテになる",
            motivation: "隣国の勇者への憧れとリビドー",
            likesAndDislikes: "ピーマンが嫌い",
          },
        },
      ],
      dialogExamples: dialogExamples({
        Money: {
          answer: "「よっしゃあうほほい大金だ～」",
        },
        Midnight: {
          answer: "顔色が変わり、無言になり、姿勢を低くする",
        },
        Bank: {
          answer: [
            "「あっ！」と大声を出して気を逸らそうとし、",
            "相手が油断した瞬間に攻撃に入る",
          ],
        },
        Island: {
          answer: "「とりあえず、寝るかぁ～」",
        },
      }),
    },
  },
} as const satisfies CustomRef<CharacterTemplate>);
