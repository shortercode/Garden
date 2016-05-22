{
  class Paint extends Tool {
    constructor () {
      super();
      this.mousedown = false;
      this.texture = null;
      this.ground = null;
      this.size = 50;
      this.previousPoint = null;
    }
    disable () {
      super.disable();
      this.previousPoint = null;
    }
    mouseDown (e) {
      this.mousedown = e.object === this.ground.mesh;
      this.mousedown && this.paint (e);
    }
    mouseMove (e) {
      this.mousedown = this.mousedown && e.object === this.ground.mesh;
      this.mousedown && this.paint (e);
    }
    mouseUp (e) {
      this.mousedown = false;
    }
    paint (e) {
      if (this.texture && this.texture.width) {
        //let W = this.ground.width > this.ground.height ? this.ground.width : this.ground.height;
        let x = (e.point.x / (this.ground.width * 0.5) + 1) * 512;
        let y = (e.point.z / (this.ground.height * 0.5) + 1) * 512;
        const s = this.size;
        const h = this.size / 2;
        this.ground.modifyTexture(CTX => {
          if (this.previousPoint && e.shiftKey) {
            let dx = this.previousPoint.x - x;
            let dy = this.previousPoint.y - y;
            let z = Math.sqrt(dx * dx + dy * dy);
            let t = Math.ceil(z / (this.size * 0.25));
            let xx = x;
            let yy = y;
            dx /= t;
            dy /= t;
            while (t--) {
              CTX.drawImage(this.texture, xx - h, yy - h, s, s);
              xx += dx;
              yy += dy;
            }
          } else {
            CTX.drawImage(this.texture, x - h, y - h, s, s);
          }
        });
        if (!this.previousPoint)
          this.previousPoint = new THREE.Vector2();
        this.previousPoint.set(x, y);
      }
    }
  }
  Tool.addTool('paint', 'format_paint', new Paint());
}