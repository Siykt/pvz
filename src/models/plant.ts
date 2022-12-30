export interface Bullet {
  /** 子弹图片地址 */
  src: string
  /** 武器伤害 */
  damage: number
}

export interface Plant {
  /** 唯一标识 */
  key: string
  /** 静态表示图地址 */
  diagram: string
  /** 动态表示图地址 */
  gif: string
  /** 子弹类型 */
  bullet: Bullet
  /** 需要多少太阳 */
  sun: number
}
