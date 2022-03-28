
class XYObject {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
type Pos = {
  x: number
  y: number
}
export default {
  /**
   * 计算二次贝塞尔曲线 Q线
   * @param Mxy 起点坐标
   * @param Txy 结束坐标
   * @returns {string} 'M xy Q xy xy Txy'
   */
  calculatedCurvePathQ(Mxy: Pos, Txy: Pos): string {
    const mtx = (Txy.x - Mxy.x) / 4
    const mty = (Txy.y - Mxy.y) / 4
    let Q1xy
    let Q2xy
    if (mty < 0 && (mtx > 10 || mtx < -10)) {
      if (mty > -10 && mty < 10) {
        Q1xy = new XYObject(Mxy.x + 10, Mxy.y + 30)
      } else {
        Q1xy = new XYObject(Mxy.x + 10, Mxy.y + 4 * Math.abs(mty))
      }
      Q2xy = new XYObject(Mxy.x + 2 * mtx, Mxy.y + 2 * mty)
    } else {
      Q1xy = new XYObject(Mxy.x, Mxy.y + 2 * mty)
      Q2xy = new XYObject(Mxy.x + 2 * mtx, Mxy.y + 2 * mty)
    }
    const path = 'M' + Mxy.x.toFixed(1) + ' ' + Mxy.y.toFixed(1) + ' Q ' + Q1xy.x.toFixed(1) + ' ' + Q1xy.y.toFixed(1) + ', ' + Q2xy.x.toFixed(1) + ' ' + Q2xy.y.toFixed(1) + ' T ' + Txy.x.toFixed(1) + ' ' + Txy.y.toFixed(1)
    return path
  },
  /**
   * 计算折线 L线
   * @param Mxy 起点坐标
   * @param Txy 结束坐标
   * @returns {string} 'M xy Q xy xy Txy'
   */
  calculatedCurvePathL(Mxy: Pos, Txy: Pos) {
    const mtx = (Txy.x - Mxy.x) / 2
    const mty = (Txy.y - Mxy.y) / 2
    let path
    if (mty > 0) {
      const L1xy = new XYObject(Mxy.x, Mxy.y + mty)
      const L2xy = new XYObject(Txy.x, Mxy.y + mty)
      path = 'M' + Mxy.x.toFixed(1) + ' ' + Mxy.y.toFixed(1) + ' L ' + L1xy.x.toFixed(1) + ' ' + L1xy.y.toFixed(1) + ', ' + L2xy.x.toFixed(1) + ' ' + L2xy.y.toFixed(1) + ' T ' + Txy.x.toFixed(1) + ' ' + Txy.y.toFixed(1)
    } else {
      const L1xy = new XYObject(Mxy.x, Mxy.y + 30)
      const L2xy = new XYObject(Mxy.x + mtx, Mxy.y + 30)
      const L3xy = new XYObject(Mxy.x + mtx, Txy.y - 30)
      const L4xy = new XYObject(Txy.x, Txy.y - 30)
      path = 'M' + Mxy.x.toFixed(1) + ' ' + Mxy.y.toFixed(1) + ' L ' + L1xy.x.toFixed(1) + ' ' + L1xy.y.toFixed(1) + ', ' + L2xy.x.toFixed(1) + ' ' + L2xy.y.toFixed(1) + ', ' + L3xy.x.toFixed(1) + ' ' + L3xy.y.toFixed(1) + ', ' + L4xy.x.toFixed(1) + ' ' + L4xy.y.toFixed(1) + ' T ' + Txy.x.toFixed(1) + ' ' + Txy.y.toFixed(1)
    }
    return path
  },
  /**
   * 计算直线 ML线
   * @param Mxy 起点坐标
   * @param Txy 结束坐标
   * @returns {string} 'M xy Lxy'
   */
  calculatedCurvePathML(Mxy: Pos, Txy: Pos) {
    const path = 'M' + Mxy.x.toFixed(1) + ' ' + Mxy.y.toFixed(1) + ' L ' + Txy.x.toFixed(1) + ' ' + Txy.y.toFixed(1)
    return path
  },
  /**
   * 获取曲线路径
   * @param Mxy 起点坐标
   * @param Txy 结束坐标
   * @returns {string} 'M xy Q xy xy Txy'
   */
  drawCurvePath(Mxy: Pos, Txy: Pos, type = 'Q'): string {
    const scalingMxy = {
      x: Mxy.x,
      y: Mxy.y,
    }
    const scalingTxy = {
      x: Txy.x,
      y: Txy.y,
    }
    if (type === 'Q') {
      return this.calculatedCurvePathQ(scalingMxy, scalingTxy)
    } else if (type === 'L') {
      return this.calculatedCurvePathL(scalingMxy, scalingTxy)
    } else {
      return this.calculatedCurvePathML(scalingMxy, scalingTxy)
    }
  },
  guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
}
