export default class Stars {
  constructor(ctx, width, height, amount) {
    this.ctx = ctx
    this.width = width
    this.height = height

    this.stars = []
    this.getStars(4, 2)
    this.getStars(amount, 0)
  }

  getStars(amount, plus) {
    let stars = this.stars
    while(amount--) {
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 2,
        plus: plus
      })
    }

    return stars
  }

  draw() {
    let ctx = this.ctx
    const colors = [
      ['rgba(94, 181, 225, 1)', 'rgba(94, 181, 225, 0)'],
      ['rgba(242, 163, 201, 1)', 'rgba(242, 163, 201, 0)'],
      ['rgba(94, 181, 225, 1)', 'rgba(94, 181, 225, 0)'],
      ['rgba(242, 163, 201, 1)', 'rgba(242, 163, 201, 0)'],
      ['rgba(255, 255, 255, 1)', 'rgba(255,255, 255, 0)']
    ]

    for(let i = 0; i < this.stars.length; i++) {
      let star = this.stars[i]
      let index = i > 3 ? 4 : i

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r + star.plus, 0, Math.PI * 2)
      
      const gdt = ctx.createCircularGradient(star.x, star.y, star.r + star.plus);
      gdt.addColorStop(0, colors[index][0]);
      gdt.addColorStop(1, colors[index][1]);

      ctx.setFillStyle(gdt)
      ctx.fill()
    }
  }

  blink() {
    this.stars = this.stars.map(star => {
      let sign = Math.random() > 0.5 ? 1 : -1
      star.r += sign * 0.5
      if(star.r < 0) {
        star.r = -star.r
      }else if(star.r > 2.2 + star.plus) {
        star.r -= 0.2
      }

      return star
    })
  }
}