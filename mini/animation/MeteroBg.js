import Metero from './Metero.js'

export default class MeteroBg {
  constructor(ctx) {
    this.ctx = ctx
    const system = wx.getSystemInfoSync()
    this.width = system.screenWidth
    this.height = system.screenHeight

    this.count = 0

    this.meteros = []
    this.generateMetero()
  }

  generateMetero() {
    let x = Math.random() * (this.width + 100)
    this.meteros.push(new Metero(this.ctx, x, this.height, Math.random() * 1))
  }

  drawMeteros() {
    this.count++
    this.count % 4 === 0 && this.generateMetero()

    this.meteros.forEach((metero, index, arr) => {
      if (metero.flow()) {
        metero.draw()
      } else {
        arr.splice(index, 1)
      }
    })
    this.ctx.draw()
  }
}
