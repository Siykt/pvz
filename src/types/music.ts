export interface MusicControl {
  getElm: () => HTMLAudioElement
  getPaused: () => boolean
  disabled: boolean
  play: () => void
  replay: () => void
  pause: () => void
}

export interface GameMusicControl {
  ChoosePlantBGMControl?: MusicControl
  PauseToneControl?: MusicControl
  ButtonClickToneControl?: MusicControl
}
