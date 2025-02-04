class Scripts {
  protected body: Script;
  constructor(body: Script) {
    this.body = body;
  }
}

// メッセージ関連
class MessageScripts extends Scripts {
  z(characterId, messages, voiceId?) {
    // showMessage
    return this.body;
  }
  speed(speedId) {
    return this.body;
  }
  resetSpeed() {
    return this.body;
  }
  choice(commands, results, cancel?) {
    return this.body;
  }
  window(isShow) {
    return this.body;
  }
}
// キャラクター関連
class CharacterScripts extends Scripts {
  show(characterId, emotionId, cartoonId, screenPositionId, tweenId) {
    return this.body;
  }
  hide(characterId) {
    return this.body;
  }
  move(characterId, screenPositionId, speedId?, isWait?) {
    return this.body;
  }
  emote(characterId, emotionId, cartoonId) {
    return this.body;
  }
  tempName(characterId, name) {
    return this.body;
  }
}
// スプライト切り替え関連
class SpriteScripts extends Scripts {
  background(backgroundImageId, layerId) {
    return this.body;
  }
  showIllust(illustId, layerId, tweenId?, isWait?) {
    return this.body;
  }
  hideIllust(illustId, tweenId) {
    return this.body;
  }
}
// サウンド関連
class AudioScripts extends Scripts {
  play(bgmIdOrBgsId, volume, panpot?, fadeId?, isWait?) {
    return this.body;
  }
  sound(soundId, volume, panpot?, isWait?) {
    return this.body;
  }
  stop(bgmOrBgs, fadeId?, isWait?) {
    return this.body;
  }
  pause(bgmOrBgs, fadeId?, isWait?) {
    return this.body;
  }
  restore(bgmOrBgs, fadeId?, isWait?) {
    return this.body;
  }
  panpot(bgmOrBgs, volume, fadeId?, isWait?) {
    return this.body;
  }
  volume(bgmOrBgs, volume, fadeId?, isWait?) {
    return this.body;
  }
  fade(bgmIdOrBgsId, volume, panpot?, fadeId?, isWait?) {
    return this.body;
  }
  crossFade(bgmIdOrBgsId, toId, volume, panpot?, fadeId?, isWait?) {
    return this.body;
  }
  forceStopBack() {
    return this.body;
  }
  forceStopSounds() {
    return this.body;
  }
  forceStopVoices() {
    return this.body;
  }
  forceStopAll() {
    return this.body;
  }
}
// 画面制御関連
class ScreenScripts extends Scripts {
  playAnimation(playingAnimationId, layerId, animationId, target, isWait?) {
    return this.body;
  }
  stopAnimation(playingAnimationId) {
    return this.body;
  }
  forceClearAnimations() {
    return this.body;
  }
  playParticle(playingParticleId, layerId, animationId, target, isWait?) {
    return this.body;
  }
  stopParticle(playingParticleId) {
    return this.body;
  }
  forceClearParticles() {
    return this.body;
  }
  tint(tintId, fadeId, isWait?) {
    return this.body;
  }
  flash(flashId, isWait?) {
    return this.body;
  }
  shake(shakeId, isWait?) {
    return this.body;
  }
  fade(inOrOut, transitionId, fadeId?, screenAreaId?) {
    return this.body;
  }
  modal(isShow, modalId) {
    return this.body;
  }
}
// 制御関連
class FlowScripts extends Scripts {
  label(name) {
    return this.body;
  }
  goto(name) {
    return this.body;
  }
  top() {
    return this.body;
  }
  end() {
    return this.body;
  }
  gameover() {
    return this.body;
  }
  title() {
    return this.body;
  }
  piece(pieceId) {
    return this.body;
  }
  episode(episodeId) {
    return this.body;
  }
  phase() {
    return this.body;
  }
  wait(ms) {
    return this.body;
  }
  waitInteractive(interactiveId, interactiveAction) {
    return this.body;
  }
  common(commonScriptName) {
    return this.body;
  }
  load(localScriptName, endWhenFinished) {
    return this.body;
  }
}
// ゲーム関連
class GameScripts extends Scripts {
  gameTrigger(gameTriggerIdOrgameVariableId, op, value) {
    return this.body;
  }
  gameVar(gameVariableId, op, value) {
    return this.body;
  }
  localTrigger(localTriggerId, value) {
    return this.body;
  }
  localVar(localVariableId, op, value) {
    return this.body;
  }
  clearLocalTriggers() {
    return this.body;
  }
  clearLocalVariables() {
    return this.body;
  }
}
// 条件分岐関連
class IfScripts extends Scripts {
  gameTrigger(gameVariableId, op, value, then, other) {
    return this.body;
  }
  gameVar(gameTriggerId, op, value, then, other) {
    return this.body;
  }
  localTrigger(localTriggerId, op, value) {
    return this.body;
  }
  localVar(localVariableId, op, value, then, other) {
    return this.body;
  }
}
// アイテム使用関連
class ItemScripts extends Scripts {
  get(itemId, count) {
    return this.body;
  }
  remove(itemId, count) {
    return this.body;
  }
  equip(itemId, equipId) {
    return this.body;
  }
  use(itemId, useId) {
    return this.body;
  }
}

// デバッグ関連
class DebugScripts extends Scripts {
  data() {
    return this.body;
  }
  log(content) {
    return this.body;
  }
  error(message) {
    return this.body;
  }
}

/** スクリプト内容 */
export class Script {
  protected scriptName: string;
  private code: string[];

  constructor(scriptName: string, code: ($: Script) => Script) {
    this.scriptName = scriptName;
    this.MES = new MessageScripts(this);
    this.CHARA = new CharacterScripts(this);
    this.SPRITE = new SpriteScripts(this);
    this.AUDIO = new AudioScripts(this);
    this.SCREEN = new ScreenScripts(this);
    this.FLOW = new FlowScripts(this);
    this.IF = new IfScripts(this);
    this.ITEM = new ItemScripts(this);
    this.DEBUG = new DebugScripts(this);
    this.code = code(this).code;
  }

  MES: MessageScripts;
  CHARA: CharacterScripts;
  SPRITE: SpriteScripts;
  AUDIO: AudioScripts;
  SCREEN: ScreenScripts;
  FLOW: FlowScripts;
  GAME: GameScripts;
  IF: IfScripts;
  ITEM: ItemScripts;
  DEBUG: DebugScripts;
  customMessage(content) {
    return this;
  }
}

new Script("", ($) => {
  $.CHARA.show("", "", "", "", "");
  $.AUDIO.play("", 100);
  return $;
});
