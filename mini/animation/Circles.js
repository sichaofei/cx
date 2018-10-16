export default class Circles {
  constructor(ctx, r) {
    this.ctx = ctx
    this.r = r
    this.circles = [
      { x: 206 * r, y: 720 * r, r: 380 * r, opacity: 0.2 },
      { x: 260 * r, y: 520 * r, r: 380 * r, opacity: 0.3 },
      { x: 240 * r, y: 460 * r, r: 380 * r, opacity: 0.3 },
      { x: 220 * r, y: 560 * r, r: 300 * r, opacity: 0.4 },
    ]
  }
  drawCircle(x, y, r, opacity) {
    const ctx = this.ctx
    ctx.beginPath();
    ctx.setStrokeStyle('rgba(142,94,184,' + opacity +')');
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }
  drawCircles() {
    const r = this.r;
    for(let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      this.drawCircle(circle.x, circle.y, circle.r, this.randomOpacity(circle.opacity));
    }
    // this.drawCircle(206 * r, 720 * r, 380 * r, this.randomOpacity(0.1));
    // this.drawCircle(260 * r, 520 * r, 380 * r, this.randomOpacity(0.2));
    // this.drawCircle(240 * r, 460 * r, 380 * r, this.randomOpacity(0.3));
    // this.drawCircle(220 * r, 560 * r, 300 * r, this.randomOpacity(0.1));
    this.ctx.draw();

    // setTimeout(()=>{
      
    //   if(this.opacity > 0.6) {
    //     this.opacity -= 0.1
    //   }else {
    //     this.opacity += 0.1;
    //   }
    //   this.drawCircles();
    // }, 1000/60)
  }
  randomOpacity(opacity) {
    
    let sign = Math.random() > 0.5 ? 1 : -1
    opacity += sign * 0.1
    
    if (opacity <= 0) {
      opacity = -opacity + 0.1
    } else if (opacity > 0.4) {
      opacity -= 0.1
    }

    return opacity;
  }
}