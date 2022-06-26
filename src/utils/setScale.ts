/**
 * 基于屏宽/屏高获取 scale 值
 * @param {number} width 作为基准的宽度
 * @param {number} height 作为基准的高度
 */
function getScale(width: number, height: number) {
  const { innerHeight, innerWidth } = window
  return Math.min(innerHeight / height, innerWidth / width)
}

/**
 * 修改 Scale 值
 * @param {HTMLElement} el 元素
 * @param {number} width 作为基准的宽度
 * @param {number} height 作为基准的高度
 */
export function setScale(el: HTMLElement, width: number, height: number) {
  const scale = getScale(width, height)
  const transform = `translate3d(-50%, -50%, 0) scale(${scale})`
  el.style.width = width + 'px'
  el.style.height = height + 'px'
  el.style.transform = transform
  return el
}

/**
 * 缩放式适配屏幕
 * @param {HTMLElement} el 元素
 * @returns 关闭 window resize 事件监听的方法
 */
export function setScaleToResize(el: HTMLElement, w = 1920, h = 1080) {
  el.style.position = 'absolute'
  el.style.top = '50%'
  el.style.left = '50%'

  let resize: (() => HTMLElement) | null = () => setScale(el, w, h)
  setScale(el, w, h)
  window.addEventListener('resize', resize)
  return () => {
    resize && window.removeEventListener('resize', resize)
    resize = null
  }
}
