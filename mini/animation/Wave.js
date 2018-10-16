export default class Wave {
  constructor(ctx, r, ratio) {
    this.ctx = ctx
    this.r = r
    this.ratio = ratio
    this.step = 0
    this.lines = [
      ["rgba(160, 86, 253,0.4)", "rgba(160, 86, 253,0.5)"],
      ["rgba(142,94,184,0.3)", "rgba(142,94,184,0.4)"]
    ]
  }

  fillWave() {
    const ctx = this.ctx;
    const r = this.r;

    this.drawBall(ctx);
    this.drawMask(ctx);

    ctx.save();
    this.clipRound(ctx);

    this.step++;

    this.drawSin(ctx);

    // ctx.setFillStyle('#fff');
    // ctx.setFontSize(40 * r);
    // ctx.fillText('收取星钻', 140 * r, 200 * r);

    // ctx.setFontSize(28 * r);
    // ctx.setFillStyle('rgba(255, 255, 255, .5)');
    // ctx.fillText('贡献越多，星钻越多', 100 * r, 240 * r);
    ctx.restore();
    ctx.draw()
  }

  drawBall(ctx) {
    const r = this.r;
    ctx.beginPath();
    ctx.arc(220 * r, 220 * r, 220 * r, 0, Math.PI * 2, false);
    ctx.clip();

    const gdt = ctx.createLinearGradient(0, 440 * r, 440 * r, 0);
    gdt.addColorStop(0, '#7635EF');
    gdt.addColorStop(1, '#2D45F7');

    ctx.setFillStyle(gdt);

    ctx.fill();
  }

  clipRound(ctx) {
    const r = this.r;
    ctx.beginPath();

    ctx.arc(220 * r, 220 * r, 210 * r, 0, Math.PI * 2, false);
    ctx.clip();
  }

  drawMask(ctx) {
    const gdt1 = ctx.createLinearGradient(110, 0, 110, 60);
    gdt1.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gdt1.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.setFillStyle(gdt1);
    ctx.fillRect(0, 0, 440 * this.r, 60);
  }

  drawSin(ctx, colors, xOffset = 0) {
    const r = this.r;
    const width = 440 * r;//canvas width
    const height = 440 * r;
    const startHeight = height * (1 - this.ratio);
    const step = this.step;
    const lines = this.lines;

    for(let i =0; i < lines.length; i++) {
      let angle = (step + 90 * i) * Math.PI / 180;
      const delta = 20;
      let deltaHeight = Math.sin(angle) * delta;
      let deltaHeightRight = Math.cos(angle) * delta;


      ctx.beginPath();

      ctx.moveTo(0, startHeight + deltaHeight);
      ctx.bezierCurveTo(width / 2 - 10*(i+1), startHeight + deltaHeight - 16, width / 2 + 10*(i+1), startHeight + deltaHeightRight -16, width, startHeight);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.lineTo(0, startHeight + deltaHeight);
      ctx.closePath();

      const gdt1 = ctx.createLinearGradient(100, startHeight + delta, 100, 200);
      gdt1.addColorStop(0, lines[i][0]);
      gdt1.addColorStop(1, lines[i][1]);

      ctx.setFillStyle(gdt1);
      ctx.fill();
    }
  }

  loop (ratio) {
    const r = this.r;
    const me = this;
    me.ctx.clearRect(0, 0, 440 * r, 440 * r);
    me.fillWave(ratio);
    // setTimeout(me.loop, 1000/60);
  }
}