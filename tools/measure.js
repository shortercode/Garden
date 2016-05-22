{
  class Measure extends Tool {
    constructor () {
      super();
      this.start = new THREE.Vector3();
      this.pointer = this.createPointer();
      this.end = new THREE.Vector3();
      this.createElement();
    }
    enable () {
      super.enable();
      this.element.style.display = 'inline-block';
    }
    disable () {
      super.disable();
      this.pointer.visible = false;
      this.element.style.display = 'none';
    }
    mouseDown (e) {
      this.start.copy(e.point);
      this.pointer.position.copy(e.point);
      this.pointer.visible = true;
    }
    mouseMove (e) {
      const d = this.end.copy(e.point).distanceTo(this.start);
      this.element.textContent = (d / 10).toFixed(3);
    }
    createElement () {
      const element = document.createElement('div');
      element.className = 'ruler';
      document.body.appendChild(element);
      this.element = element;
    }
    createPointer (e) {
      var geometry = new THREE.SphereGeometry( 5, 16, 8 );
      var material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
      var sphere = new THREE.Mesh( geometry, material );
      sphere.visible = false;
      return sphere;
    }
  }
  Tool.addTool('measure', 'straighten', new Measure());
}