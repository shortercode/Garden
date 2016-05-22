{
  class Orbit extends Tool {
    constructor () {
      super();
    }
    enable () {
      super.enable();
      this.controls.enabled = true;
    }
    disable () {
      super.disable();
      this.controls.enabled = false;
    }
  }
  Tool.addTool('orbit', '3d_rotation', new Orbit());
}