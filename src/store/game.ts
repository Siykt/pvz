import { Plant } from '@/types/plant'
import { GameMusicControl } from '@/types/music'
import { defineStore, storeToRefs } from 'pinia'
import { AllPlantMap } from '@/constants/plant'

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
  /** 当局游戏选择的植物的上限 */
  plantLimit: number
  /** 鼠标选中的植物 */
  selectedPlant?: Plant
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
  /** 当前用户触发的事件数据 */
  curEvent: Nullable<MouseEvent>
}

export const useGameStore = defineStore('GameStore', {
  state: (): GameStore => ({
    gameStatus: GameStatus.playing,
    isPause: false,
    isDisabledMusic: true,
    isAutoCollectingSun: false,
    playerData: { sun: 0, plants: [...AllPlantMap], plantLimit: 5 },
    musicControl: {},
    curEvent: null
  })
})

export const useGameStoreRefs = () => storeToRefs(useGameStore())
