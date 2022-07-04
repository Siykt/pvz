import { Plant } from '@/components/Plant/type'
import { GameMusicControl } from '@/types/music'
import { defineStore, storeToRefs } from 'pinia'

/** 游戏状态 */
export enum GameStatus {
  /** 选择植物阶段 */
  choosePlant,
  /** 游戏中 */
  playing,
  /** 游戏结束 */
  ended
}

export interface PlayerData {
  /** 阳光数 */
  sun: number
  /** 当局游戏选择的植物 */
  plants: Plant[]
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
  /** 玩家数据 */
  playerData: PlayerData
  /** 挂载 Store 的音乐控件 */
  musicControl: GameMusicControl
}

export const useGameStore = defineStore('GameStore', {
  state: (): GameStore => ({
    gameStatus: GameStatus.choosePlant,
    isPause: false,
    isDisabledMusic: false,
    isAutoCollectingSun: false,
    playerData: { sun: 0, plants: [] },
    musicControl: {}
  })
})

export const useGameStoreRefs = () => storeToRefs(useGameStore())
