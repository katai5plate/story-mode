import { Script, ScriptCallback } from "../Script";
import { CharacterDefineType } from "./characters";
import { JsonData } from "./fields";
import {
  AmbientAsset,
  BackgroundImage,
  Cartoon,
  Emotion,
  Flash,
  GameOperator,
  GameTrigger,
  GameVariable,
  IllustImage,
  Interactive,
  InteractiveAction,
  Item,
  Layer,
  Modal,
  MusicAsset,
  Panpot,
  Particle,
  ScreenArea,
  ScreenPosition,
  Shake,
  SoundAsset,
  Speed,
  Tint,
  Tween,
  VoiceAsset,
  Volume,
} from "./messages";
import { ScenarioTheoryDefineType } from "./stories";

declare const optionalMarker: unique symbol;
type OptionalMarker<T> = { [optionalMarker]: T };
const optional = <T>(): OptionalMarker<T> => ({} as any);
const required = <T>() => undefined as T;
const defineController = <T>(controller: T): ExpandOptional<T> =>
  controller as any;
type ExpandOptional<T> = T extends object
  ? {
      [K in keyof T as T[K] extends OptionalMarker<any>
        ? K
        : never]?: T[K] extends OptionalMarker<infer U> ? U : never;
    } & {
      [K in keyof T as T[K] extends OptionalMarker<any>
        ? never
        : K]: T[K] extends object ? ExpandOptional<T[K]> : T[K];
    }
  : T;

type AudioBackType = "Music" | "Ambient";
type AudioType = AudioBackType | "Sound";
type AudioStopType = "Stop" | "Pause";
type FadeType = "In" | "Out";
type GotoType =
  | "Top"
  | "End"
  | ScenarioTheoryDefineType
  | ScenarioTheoryDefineType
  | "NextPhase";
type VariableType = "Trig" | "Var";
type ItemOwnType = "Get" | "Remove";
type ItemUseType = "Apply" | "Equip";

export const Controller = defineController({
  Message: {
    Show: {
      chara: required<CharacterDefineType>(),
      mes: required<string[]>(),
      voice: optional<VoiceAsset>(),
    },
    Update: {
      speed: optional<Speed | null>(),
      window: optional<boolean>(),
    },
  },
  Character: {
    Show: {
      chara: required<CharacterDefineType>(),
      emote: required<Emotion>(),
      cartoon: required<Cartoon>(),
      pos: required<ScreenPosition>(),
      tween: required<Tween>(),
    },
    Update: {
      show: optional<boolean>(),
      move: optional<{
        pos: ScreenPosition;
        tween: Tween;
      }>(),
      name: optional<string>(),
    },
  },
  Sprite: {
    Show: {
      image: required<BackgroundImage | IllustImage>(),
      layer: required<Layer>(),
      fade: {
        tween: required<Tween>(),
        wait: required<boolean>(),
      },
    },
    Update: {
      show: optional<boolean>(),
      fade: optional<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
  },
  Audio: {
    Play: {
      media: required<MusicAsset | AmbientAsset | SoundAsset>(),
      volume: optional<Volume>(),
      panpot: optional<Panpot>(),
      fade: optional<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Stop: {
      media: required<AudioType>(),
      type: required<AudioStopType>(),
      fade: optional<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Restore: {
      media: required<AudioType>(),
      fade: optional<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Update: {
      media: required<AudioBackType>(),
      volume: optional<Volume>(),
      panpot: optional<Panpot>(),
      fade: optional<{
        tween: Tween;
        wait: boolean;
        cross?: MusicAsset | AmbientAsset;
      }>(),
    },
    ForceStop: {
      media: required<AudioType | "All">(),
    },
  },
  Screen: {
    Play: {
      id: required<string>(),
      media: required<Animation | Particle>(),
      layer: required<Layer>(),
      pos: required<ScreenPosition>(),
      wait: required<boolean>(),
    },
    Stop: {
      id: required<string>(),
    },
    Effect: {
      tint: optional<{
        media: Tint;
        fade?: {
          tween: Tween;
          wait: boolean;
        };
      }>(),
      flash: optional<{ media: Flash; wait: boolean }>(),
      shake: optional<{ media: Shake; wait: boolean }>(),
      black: optional<{
        to: FadeType;
        area: ScreenArea;
        fade?: {
          tween: Tween;
          wait: boolean;
        };
      }>(),
    },
    Modal: { media: required<Modal>(), active: required<boolean>() },
  },
  Flow: {
    Label: { name: required<string>() },
    Go: { to: required<GotoType>() },
    Call: { script: required<Script>(), comeback: optional<boolean>() },
    Wait: {
      sec: required<number>(),
      interactive: {
        type: required<Interactive>(),
        action: required<InteractiveAction>(),
      },
    },
    Trig: {
      name: required<GameTrigger | string>(),
      value: required<boolean>(),
    },
    Var: {
      name: required<GameVariable | string>(),
      value: required<JsonData>(),
    },
    ClearLocal: { type: required<VariableType>() },
    IfTrig: {
      name: required<GameTrigger | string>(),
      op: required<GameOperator>(),
      value: required<boolean>(),
      then: required<ScriptCallback>(),
      else: optional<ScriptCallback>(),
    },
    IfVar: {
      name: required<GameVariable | string>(),
      op: required<GameOperator>(),
      value: required<JsonData>(),
      then: required<ScriptCallback>(),
      else: optional<ScriptCallback>(),
    },
  },
  Game: {
    Item: {
      target: required<Item>(),
      own: optional<{ op: ItemOwnType; count: number }>(),
      use: optional<ItemUseType>(),
    },
  },
  Debug: {
    Log: { content: required<JsonData>() },
    Error: {
      message: required<string>(),
      content: optional<JsonData>(),
    },
    Any: { content: required<JsonData>() },
  },
});
export type ControllerType = typeof Controller;
