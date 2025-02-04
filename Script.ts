/** スクリプト内容 */
export class Script {
  scriptName: string;
  constructor(scriptName: string) {
    this.scriptName = scriptName;
  }

  // メッセージ関連
  $(characterId, message, voiceId) {} // showMessage
  changeMessageSpeed(messageSpeedId) {}
  resetMessageSpeed() {}
  choice(commands, results, cancel) {}
  hideWindow() {}
  showWindow() {}

  // キャラクター関連
  showCharacter(characterId, emotionId, cartoonId, position, tweenId) {}
  hideCharacter(characterId) {}
  moveCharacter(characterId, position, speedId) {}
  emoteCharacter(characterId, emotionId, cartoonId) {}
  changeTemporaryCharacterName(characterId, name) {}

  // スプライト切り替え関連
  changeBackground(backgroundId, layerId) {}
  showIlust(illustId, layerId, tweenId) {}
  hideIlust(illustId, tweenId) {}

  // サウンド関連
  playBgm(bgmId, volume, panpot, fade) {}
  playBgs(bgsId, volume, panpot, fade) {}
  playSound(soundId, volume, panpot) {}
  stopBgm(fade) {}
  stopBgs(fade) {}
  stopSound(fade) {}
  pauseBgm(fade) {}
  pauseBgs(fade) {}
  restoreBgm(fade) {}
  restoreBgs(fade) {}
  changeBgmPanpot(volume, fade) {}
  changeBgmVolume(volume, fade) {}
  changeBgsPanpot(volume, fade) {}
  changeBgsVolume(volume, fade) {}
  forceStopVoice() {}

  // 画面制御関連
  playAnimation(playingAnimationId, layerId, animationName, target, isWait) {}
  stopAnimation(playingAnimationId) {}
  forceClearAnimations() {}
  tintScreen(tintId) {}
  flashScreen(colorId) {}
  shakeScreen(shakeId) {}
  fadein(transitionId) {}
  fadeout(transitionId) {}
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
  ifGameTrigger(gameVariableId, op, value, then, other) {}
  ifGameVariable(gameTriggerId, op, value, then, other) {}
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
