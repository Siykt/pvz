import { defineStore } from 'pinia'

/** 游戏状态 */
export enum GameStatus {
  /** 选择植物阶段 */
  choosePlant,
  /** 游戏中 */
  playing,
  /** 游戏结束 */
  ended
}

export interface GameStore {
  /** 游戏状态 */
  gameStatus: GameStatus
  /** 是否暂停 */
  isPause: boolean
  /** 是否禁用音乐 */
  isDisabledMusic: boolean
  /** 是否开启自动收集阳光 */
  isAutoCollectingSun: boolean
}

export const useGameStore = defineStore('GameStore', {
  state: (): GameStore => ({
    gameStatus: GameStatus.choosePlant,
    isPause: false,
    isDisabledMusic: false,
    isAutoCollectingSun: false
  })
})
