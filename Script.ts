/** スクリプト内容 */
export class Script {
  scriptName: string;
  constructor(scriptName: string) {
    this.scriptName = scriptName;
  }

  // メッセージ関連
  $(characterId, message, voiceId?) {} // showMessage
  changeMessageSpeed(messageSpeedId) {}
  resetMessageSpeed() {}
  choice(commands, results, cancel?) {}
  hideWindow() {}
  showWindow() {}

  // キャラクター関連
  showCharacter(characterId, emotionId, cartoonId, position, tweenId) {}
  hideCharacter(characterId) {}
  moveCharacter(characterId, position, speedId?, isWait?) {}
  emoteCharacter(characterId, emotionId, cartoonId) {}
  changeTemporaryCharacterName(characterId, name) {}

  // スプライト切り替え関連
  changeBackground(backgroundId, layerId) {}
  showIlust(illustId, layerId, tweenId?, isWait?) {}
  hideIlust(illustId, tweenId) {}

  // サウンド関連
  playBgm(bgmId, volume, panpot?, fadeId?, isWait?) {}
  playBgs(bgsId, volume, panpot?, fadeId?, isWait?) {}
  playSound(soundId, volume, panpot?, isWait?) {}
  stopBgm(fadeId?, isWait?) {}
  stopBgs(fadeId?, isWait?) {}
  pauseBgm(fadeId?, isWait?) {}
  pauseBgs(fadeId?, isWait?) {}
  restoreBgm(fadeId?, isWait?) {}
  restoreBgs(fadeId?, isWait?) {}
  changeBgmPanpot(volume, fadeId?, isWait?) {}
  changeBgmVolume(volume, fadeId?, isWait?) {}
  changeBgsPanpot(volume, fadeId?, isWait?) {}
  changeBgsVolume(volume, fadeId?, isWait?) {}
  crossFadeBgm(bgmId, volume, panpot?, fadeId?, isWait?) {}
  crossFadeBgs(bgsId, volume, panpot?, fadeId?, isWait?) {}
  forceStopSounds() {}
  forceStopVoices() {}

  // 画面制御関連
  playAnimation(playingAnimationId, layerId, animationId, target, isWait?) {}
  stopAnimation(playingAnimationId) {}
  forceClearAnimations() {}
  tintScreen(tintId, fadeId, isWait?) {}
  flashScreen(flashId, isWait?) {}
  shakeScreen(shakeId, isWait?) {}
  fadein(transitionId, fadeId?, fadeAreaId?) {}
  fadeout(transitionId, fadeId?, fadeAreaId?) {}
  showModal(modalId, resultVariableId) {}
  hideModal(modalId) {}

  // 制御関連
  label(name) {}
  goto(name) {}
  gotoTop() {}
  gotoEof() {}
  gotoGameOver() {}
  gotoTitle() {}
  wait(ms) {}
  waitInteractive(interactiveId, interactiveAction) {}

  // 条件分岐関連
  setGameTrigger(gameTriggerId, op, value) {}
  setGameVariable(gameVariableId, op, value) {}
  setLocalTrigger(localTriggerId, value) {}
  setLocalVariable(localVariableId, op, value) {}
  clearLocalTriggers() {}
  clearLocalVariables() {}
  ifGameVariable(gameTriggerId, op, value, then, other) {}
  ifGameTrigger(gameVariableId, op, value, then, other) {}
  ifLocalTrigger(localTriggerId, op, value) {}
  ifLocalVariable(localVariableId, op, value, then, other) {}

  // アイテム使用関連
  getItem(itemId, count) {}
  removeItem(itemId, count) {}
  equipItem(itemId, equipId) {}
  useItem(itemId, useId) {}

  // デバッグ関連
  consoleDebugData() {}
  consoleLog(content) {}
  assert(message) {}

  // 外部スクリプト読み込み関連
  callCommon(commonScriptName) {}
  callLocal(localScriptName) {}
}
