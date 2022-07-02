import { useEventListener } from '@vueuse/core'

/**
 * 缩放与透明动画
 * @param el 元素
 * @param time 回调间隔
 */
export function useScaleAndOpacityPlayAnimation(el: HTMLElement, time = 300) {
  const clearMousedown = useEventListener(el, 'mousedown', () => {
    el.style.transform = 'scale(0.95)'
    el.style.opacity = '0.9'
  })
  const clearMouseup = useEventListener(el, 'mouseup', () => {
    el.style.transform = 'scale(1)'
    el.style.opacity = '1'
  })
  const clearClick = useEventListener(el, 'click', () => {
    el.style.transform = 'scale(0.95)'
    el.style.opacity = '0.9'
    setTimeout(() => {
      el.style.transform = 'scale(1)'
      el.style.opacity = '1'
    }, time)
  })
  return () => {
    clearMousedown()
    clearMouseup()
    clearClick()
  }
}
