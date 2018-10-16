exports.drawBgBall = (ctx) => {
  ctx.beginPath();
  ctx.arc(180, 360, 340, 0, Math.PI * 2);
  const gdt = ctx.createCircularGradient(180, 360, 340);
  gdt.addColorStop(0, 'rgba(38, 10, 103, 0.6)');
  gdt.addColorStop(0.9, 'rgba(38, 10, 103, 0.6)');
  gdt.addColorStop(1, 'rgba(57, 19, 142, 0)');
  ctx.setFillStyle(gdt);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(270, 320, 250, 0, Math.PI * 2);
  const gdt1 = ctx.createCircularGradient(270, 320, 250);
  gdt1.addColorStop(0, 'rgba(57, 19, 142, 0.6)');
  gdt1.addColorStop(0.9, 'rgba(57, 19, 142, 0.6)');
  gdt1.addColorStop(1, 'rgba(57, 19, 142, 0)');
  ctx.setFillStyle(gdt1);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(100, 310, 100, 0, Math.PI * 2, false);
  const gdt2 = ctx.createCircularGradient(100, 310, 100);
  gdt2.addColorStop(0, 'rgba(59, 11, 117, 1)');
  gdt2.addColorStop(0.6, 'rgba(59, 11, 117, 0.8)');
  gdt2.addColorStop(1, 'rgba(59, 11, 117, 0)');
  ctx.setFillStyle(gdt2);
  ctx.fill();

  // ctx.draw();
} 
