import { Script, ScriptCallback } from "../Script";
import { CharacterDefineType } from "../types/characters";
import { defineCommands, opt, req } from "../types/commands";
import { JsonData } from "../types/fields";
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
} from "../types/messages";
import { ScenarioTheoryDefineType } from "../types/stories";

export type AudioBackType = "Music" | "Ambient";
export type AudioType = AudioBackType | "Sound";
export type AudioStopType = "Stop" | "Pause";
export type FadeType = "In" | "Out";
export type GotoType =
  | "Top"
  | "End"
  | ScenarioTheoryDefineType
  | ScenarioTheoryDefineType
  | "NextPhase";
export type VariableType = "Trig" | "Var";
export type ItemOwnType = "Get" | "Remove";
export type ItemUseType = "Apply" | "Equip";

export const Commands = defineCommands({
  Message: {
    Show: {
      chara: req<CharacterDefineType>(),
      mes: req<string[]>(),
      voice: opt<VoiceAsset>(),
    },
    Update: {
      speed: opt<Speed | null>(),
      window: opt<boolean>(),
    },
  },
  Character: {
    Show: {
      chara: req<CharacterDefineType>(),
      emote: req<Emotion>(),
      cartoon: req<Cartoon>(),
      pos: req<ScreenPosition>(),
      tween: req<Tween>(),
    },
    Update: {
      show: opt<boolean>(),
      move: opt<{
        pos: ScreenPosition;
        tween: Tween;
      }>(),
      name: opt<string>(),
    },
  },
  Sprite: {
    Show: {
      image: req<BackgroundImage | IllustImage>(),
      layer: req<Layer>(),
      fade: {
        tween: req<Tween>(),
        wait: req<boolean>(),
      },
    },
    Update: {
      show: opt<boolean>(),
      fade: opt<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
  },
  Audio: {
    Play: {
      media: req<MusicAsset | AmbientAsset | SoundAsset>(),
      volume: opt<Volume>(),
      panpot: opt<Panpot>(),
      fade: opt<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Stop: {
      media: req<AudioType>(),
      type: req<AudioStopType>(),
      fade: opt<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Restore: {
      media: req<AudioType>(),
      fade: opt<{
        tween: Tween;
        wait: boolean;
      }>(),
    },
    Update: {
      media: req<AudioBackType>(),
      volume: opt<Volume>(),
      panpot: opt<Panpot>(),
      fade: opt<{
        tween: Tween;
        wait: boolean;
        cross?: MusicAsset | AmbientAsset;
      }>(),
    },
    ForceStop: {
      media: req<AudioType | "All">(),
    },
  },
  Screen: {
    Play: {
      id: req<string>(),
      media: req<Animation | Particle>(),
      layer: req<Layer>(),
      pos: req<ScreenPosition>(),
      wait: req<boolean>(),
    },
    Stop: {
      id: req<string>(),
    },
    Effect: {
      tint: opt<{
        media: Tint;
        fade?: {
          tween: Tween;
          wait: boolean;
        };
      }>(),
      flash: opt<{ media: Flash; wait: boolean }>(),
      shake: opt<{ media: Shake; wait: boolean }>(),
      black: opt<{
        to: FadeType;
        area: ScreenArea;
        fade?: {
          tween: Tween;
          wait: boolean;
        };
      }>(),
    },
    Modal: { media: req<Modal>(), active: req<boolean>() },
  },
  Flow: {
    Label: { name: req<string>() },
    Go: { to: req<GotoType>() },
    Call: { script: req<Script>(), comeback: opt<boolean>() },
    Wait: {
      sec: req<number>(),
      interactive: {
        type: req<Interactive>(),
        action: req<InteractiveAction>(),
      },
    },
    Trig: {
      name: req<GameTrigger | string>(),
      value: req<boolean>(),
    },
    Var: {
      name: req<GameVariable | string>(),
      value: req<JsonData>(),
    },
    ClearLocal: { type: req<VariableType>() },
    IfTrig: {
      name: req<GameTrigger | string>(),
      op: req<GameOperator>(),
      value: req<boolean>(),
      then: req<ScriptCallback>(),
      else: opt<ScriptCallback>(),
    },
    IfVar: {
      name: req<GameVariable | string>(),
      op: req<GameOperator>(),
      value: req<JsonData>(),
      then: req<ScriptCallback>(),
      else: opt<ScriptCallback>(),
    },
  },
  Game: {
    Item: {
      target: req<Item>(),
      own: opt<{ op: ItemOwnType; count: number }>(),
      use: opt<ItemUseType>(),
    },
  },
  Debug: {
    Log: { json: req<JsonData>() },
    Error: {
      message: req<string>(),
      content: opt<JsonData>(),
    },
    Any: { json: req<JsonData>() },
  },
});
export type ControllerType = typeof Commands;
