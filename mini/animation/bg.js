import Stars from './Stars.js'
import Metero from './Metero.js'

export default class bg {
  constructor(ctx) {
    this.ctx = ctx
    const system = wx.getSystemInfoSync()
    this.width = system.screenWidth
    this.height = system.screenHeight

    this.count = 0
    this.stars = new Stars(this.ctx, this.width, this.height, 20)

    // this.meteros = []
    // this.generateMetero()
  }

  // generateMetero() {
  //   let x = Math.random() * (this.width + 100)
  //   this.meteros.push(new Metero(this.ctx, x, this.height, Math.random() * 4))
  // }

  drawStars() {
    this.count++ 
    this.stars.blink() 
    this.stars.draw()
    this.ctx.draw()
  }

//   drawMeteros() {
//     this.count % 34 === 0 && this.generateMetero()

//     this.meteros.forEach((metero, index, arr) => {
//       if (metero.flow()) {
//         metero.draw()
//       } else {
//         arr.splice(index, 1)
//       }
//     })
    // this.ctx.draw()
//   }
}
