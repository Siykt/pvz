import { Plant } from '@/models/plant'
import Plant1Diagram from '@/assets/images/plants/plant-1.png'
import Plant1Gif from '@/assets/images/plants/plant-1.gif'
import Plant1Bullet from '@/assets/images/plants/plant-1-bullet.png'
import Plant2Diagram from '@/assets/images/plants/plant-2.png'
import Plant2Gif from '@/assets/images/plants/plant-2.gif'
import Plant2Bullet from '@/assets/images/plants/plant-2-bullet.png'

/** 豌豆射手 */
export const Plant1: Plant = {
  key: '豌豆射手',
  diagram: Plant1Diagram,
  gif: Plant1Gif,
  sun: 100,
  bullet: {
    src: Plant1Bullet,
    damage: 10
  }
}

/** 向日葵 */
export const Plant2: Plant = {
  key: '向日葵',
  diagram: Plant2Diagram,
  gif: Plant2Gif,
  sun: 50,
  bullet: {
    src: Plant2Bullet,
    damage: 10
  }
}

export const AllPlantMap: Plant[] = [Plant1, Plant2]
