export function getContainersTop(el: HTMLElement): number {
  return el.offsetParent
      ? el.offsetTop + getContainersTop(el.offsetParent as HTMLElement)
      : el.offsetTop
}
export function getContainersLeft(el: HTMLElement): number {
  return el.offsetParent
    ? el.offsetLeft + getContainersLeft(el.offsetParent as HTMLElement)
    : el.offsetLeft
}
export function getBrowserHW(): {width: number, height: number} { // 获取浏览器可视高宽
  if (window.innerHeight !== undefined) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  } else if (document.compatMode === 'CSS1Compat') {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
  }
}
export function transferCss(vl: string): number { // 去除样式单位
  const index = isCssInUnit(vl)
  let data = vl
  if (index >= 0) {
    data = vl.substring(0, index)
  }
  return +data
}
export function isCssInUnit(vl: string): number {
  const units = ['%', 'px', 'in', 'cn', 'mm', 'em', 'ex', 'pt', 'pc']
  let index = -1
  for (const item of units) {
    if (vl.indexOf(item) >= 0) {
      index = vl.indexOf(item)
      break
    }
  }
  return index
}
export function getDomPosition(dom: HTMLElement, panelId: string) {
  const panel = document.getElementById(panelId) as HTMLElement
  if (!panel) throw new TypeError('panelId is wrong')
  console.log(dom.getBoundingClientRect().left, panel.getBoundingClientRect().left)
  return {
    x: dom.getBoundingClientRect().left - panel.getBoundingClientRect().left,
    y: dom.getBoundingClientRect().top - panel.getBoundingClientRect().top,
  }
}