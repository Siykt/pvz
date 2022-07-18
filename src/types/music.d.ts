export interface MusicControl {
  getElm: () => HTMLAudioElement
  getPaused: () => boolean
  disabled: boolean
  play: () => void
  replay: () => void
  pause: () => void
}

/** 音乐控制器 */
export interface GameMusicControl {
  /** 选择植物画面背景音乐 */
  ChoosePlantBGMControl?: MusicControl
  /** 暂停操作音 */
  PauseToneControl?: MusicControl
  /** 按钮操作音 */
  ButtonClickToneControl?: MusicControl
  /** 选择植物操作音 */
  ChoosePlantToneControl?: MusicControl
  /** 种植植物操作音 */
  PlantToneControl?: MusicControl
}
