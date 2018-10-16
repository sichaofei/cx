export default class Metero {
  constructor(ctx, x, h, speed) {
    this.ctx = ctx
    this.x = x
    this.y = 0
    this.vx = -(speed + 1)
    this.vy = -this.vx / 2
    this.len = 50 + Math.random() * 10
  }

  flow() {
    if(this.x < -this.len || this.y > this.len + this.h) {
      return false
    }
    this.x += this.vx
    this.y += this.vy
    
    return true
  }

  draw() {
    let ctx = this.ctx
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, Math.PI/4, 5 * Math.PI/4)
    ctx.lineTo(this.x + this.len, this.y - this.len / 2)
    ctx.closePath()
    const gdt = ctx.createCircularGradient(this.x, this.y, this.len);
    gdt.addColorStop(0, 'rgba(23, 166, 181, 1)');
    gdt.addColorStop(1, 'rgba(23, 166, 181, 0)');
    ctx.setFillStyle('rgba(23, 166, 181, 1)');
    ctx.fill()
    // ctx.drawImage('/images/metero.png', this.x, this.y, 91, 59);
    ctx.draw();
  }
}