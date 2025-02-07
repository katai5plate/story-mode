# story-mode

ゲームシナリオライティング特化型内部 DSL

## memo

- JSON から送られる想定のメッセージ一覧
  - Character
    - id
    - emotionId
    - cartoonId
  - Screen
    - screenPositionId
    - tweenId
    - fadeId
    - tintId
    - flashId
    - shakeId
    - screenAreaId
    - transitionId
    - modalId
  - Animation
    - speedId
    - animationId
    - particleId
  - Message
    - voiceId
    - fontId
  - Sprite
    - backgroundImageId
    - layerId
    - illustId
  - Audio
    - bgmId
    - bgsId
    - soundId
    - volumeId
    - panpotId
  - Interactive
    - id
    - action
  - Game
    - triggerId
    - variableId
    - itemId
    - equipId
    - useId
  - Script
    - id
    - beatId
  - Custom
    - id

```
// 画面制御関連
playingAnimationId // Script内制御
playingParticleId // Script内制御
isWait // Script内制御
resultVariableId // Engine内部変数でいいのでは？

// 条件分岐関連
localTriggerId // Script内制御
localVariableId // Script内制御
```

```
($, z, x) => $

$: Story, Scenario
Z: 遠目で見ると文章の目線の流れの形になる
x: Exchange
```

```js
new Script(($) =>
  $.Head({ name: "デモコード" })
    .Mes({
      chara: $.REF.Character.Alex,
      mes: [
        "ああああああああああああ",
        "いいいいいいいいいいいい",
        "うううううううううううう",
      ],
    })
    .Mes({
      chara: $.REF.Character.Alex,
      mes: [
        "はっ！", //
      ],
    })
    .Do("Message", "Show", {
      chara: $.REF.Character.Alex,
      mes: [
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
        `aaaaaaa${tag.b("123")}bbbbbbbb`,
      ],
    })
    .Do("Audio", "Play", { media: null as MusicAsset })
    .Do("Audio", "Play", { media: null as SoundAsset })
    .Do("Debug", "Any", { json: "aaaa" })
);
```

```
// 自動生成
Book/

// インデックスツリー
EPISODE.ts
E0_CHAPTER.ts
E0C1_PHASE.ts
E0C1P1_BEAT.ts
E0C1P1B1_SCRIPT.ts
E0C1P1B1_FORESHADOW.ts

// 執筆テンプレート生成例 (Introなどの名称はデフォルト名とする)
E0_Main.ts
E0C1_Intro.ts
E0C1P1_Purpose.ts
E0C1P1B1_Cause.ts
E0C1P1B2_Result.ts
E0C1P1B3_Next.ts
E0C1P2_Conflict.ts
E0C1P2B1_Cause.ts
E0C1P2B2_Result.ts
E0C1P2B3_Next.ts
E0C1P3_Worries.ts
E0C1P3B1_Cause.ts
E0C1P3B2_Result.ts
E0C1P3B3_Next.ts
E0C1P4_Decision.ts
E0C1P4B1_Cause.ts
E0C1P4B2_Result.ts
E0C1P4B3_Next.ts

// 別案 1
E0_Main/
  C1_Intro/
    P1_Purpose/
      B1_Cause/
        Cause.E0C1P1B1.ts
      B2_Result/
        Result.E0C1P1B2.ts
      B3_Next/
        Next.E0C1P1B3.ts
      Purpose.E0C1P1.ts
    P2_Conflict/
      B1_Cause/
        Cause.E0C1P2B1.ts
      B2_Result/
        Result.E0C1P2B2.ts
      B3_Next/
        Next.E0C1P2B3.ts
      Conflict.E0C1P2.ts
    P3_Worries/
      B1_Cause/
        Cause.E0C1P3B1.ts
      B2_Result/
        Result.E0C1P3B2.ts
      B3_Next/
        Next.E0C1P3B3.ts
      Worries.E0C1P3.ts
    P4_Decision/
      B1_Cause/
        Cause.E0C1P4B1.ts
      B2_Result/
        Result.E0C1P4B2.ts
      B3_Next/
        Next.E0C1P4B3.ts
      Decision.E0C1P4.ts
    Intro.E0C1.ts
  Main.ts

// 別案 2
E0_Main/
  C1_Intro/
    P1_Purpose/
      B1.Cause.ts
      B2.Result.ts
      B3.Next.ts
      Phase_1.Purpose.ts
    P2_Conflict/
      B1.Cause.ts
      B2.Result.ts
      B3.Next.ts
      Phase_2_Conflict.ts
    P3_Worries/
      B1.Cause.ts
      B2.Result.ts
      B3.Next.ts
      Phase_3_Worries.ts
    P4_Decision/
      B1.Cause.ts
      B2.Result.ts
      B3.Next.ts
      Phase_4_Decision.ts
    Chapter_1_Intro.ts
  Episode_0_Main.ts
```

```ts
export const No1_Intro: Book<typeof Chapter, ChapterPlot>["No1_Intro"] = {
  name: "",
  summary: "",
};
```
