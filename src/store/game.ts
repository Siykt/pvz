import { defineStore } from 'pinia'

/** 游戏状态 */
export enum GameStatus {
  /** 选择植物阶段 */
  choosePlant,
  /** 游戏暂停 */
  pause,
  /** 游戏中 */
  playing,
  /** 游戏结束 */
  ended
}

export interface GameStore {
  gameStatus: GameStatus
}

export const useGameStore = defineStore('GameStore', {
  state: (): GameStore => ({
    gameStatus: GameStatus.choosePlant
  }),
  actions: {
    updateGameStatus(status: GameStatus) {
      this.gameStatus = status
    }
  }
})
