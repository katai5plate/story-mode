type Message<IsFile = false> = {
  name: string;
  message?: string;
  summary?: string;
} & IsFile extends true
  ? {
      filepath?: string;
    }
  : {};

export interface Emotion extends Message {}
export interface Cartoon extends Message {}

export interface ScreenPosition extends Message {}
export interface ScreenArea extends Message {}
export interface Tween extends Message {}
export interface Fade extends Message {}
export interface Tint extends Message {}
export interface Flash extends Message {}
export interface Shake extends Message {}
export interface Transition extends Message {}
export interface Modal extends Message {}

export interface Speed extends Message {}
export interface Animation extends Message {}
export interface Particle extends Message {}

export interface VoiceAsset extends Message<true> {}
export interface Font extends Message<true> {}

export interface BackgroundImage extends Message<true> {}
export interface IllustImage extends Message<true> {}
export interface Layer extends Message {}

export interface MusicAsset extends Message<true> {}
export interface AmbientAsset extends Message<true> {}
export interface SoundAsset extends Message<true> {}
export interface Volume extends Message {}
export interface Panpot extends Message {}

export interface Interactive extends Message {}
export interface InteractiveAction extends Message {}

export interface GameTrigger extends Message {}
export interface GameVariable extends Message {}
export interface GameOperator extends Message {}
export interface GameScene extends Message {}

export interface AudioControl extends Message {}
export interface ScreenControl extends Message {}
export interface Tag extends Message {}

export interface Item extends Message {}
export interface Equip extends Message {}
export interface Use extends Message {}

export interface Custom extends Message {}
export interface CustomFile extends Message<true> {}
