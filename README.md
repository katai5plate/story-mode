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
    - pieceId
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
