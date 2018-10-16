export default class Zuan {
  constructor(array, width, height) {
    this.array = array;
    this.width = width;
    this.height = height;

    this.points = [];
    this.r = 50;
  }

  preparePoint() {
    for (var i = this.array.length - 1; i >= 0; i--) {
      const point = this.getPoint();
      this.array[i].x = point.x;
      this.array[i].y = point.y;
    }
    return this.array;
  }

  getPoint() {
    var point = this.randomPoint(this.width - this.r, this.height - this.r);
    
    if (this.testAvailabel(point)) {
      this.points.push(point);
      return point;
    } else {
      return this.getPoint();


    }
  }

  randomPoint(width, height) {
    const x = parseInt(Math.random() * width);
    const y = 50 + parseInt(Math.random() * (height - 100));

    return { x: x, y: y };
  }

  testOverlay(pointA, pointB) {
    const gapX = Math.abs(pointA.x - pointB.x);
    const gapY = Math.abs(pointA.y - pointB.y);
    const distance = Math.sqrt(gapX * gapX + gapY * gapY);

    return distance > this.r * 2;
  }

  testAvailabel(newPoint) {
    let flag = true;
    
    //avoid canvas
    if (newPoint.y > (180 - this.r) && newPoint.y < 360) {
      if (newPoint.x < 180) {
        flag = false;
        return flag;
      }
    }

    for (var i = this.points.length - 1; i >= 0; i--) {
      if (!this.testOverlay(this.points[i], newPoint)) {
        flag = false;
        break;
      }
    }
    return flag;
  }

}