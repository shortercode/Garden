class Cursor {

  constructor (camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.element = this.createElement();
    //this.element.castShadow = true;
    this.mouse = new THREE.Vector2();
    this.caster = new THREE.Raycaster();
    this.bindMouse();
  }

  createElement () {
    var geometry = new THREE.SphereGeometry( 5, 16, 8 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    this.scene.add(sphere);
    return sphere;
  }

  bindMouse () {
    document.body.addEventListener('mousedown', e => this.mouseDown(e));
    document.body.addEventListener('mousemove', e => this.mouseMove(e));
    document.body.addEventListener('mouseup', e => this.mouseUp(e));
  }

  mouseMove (e) {
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  	this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    this.caster.setFromCamera( this.mouse, this.camera );
    var intersects = this.caster.intersectObjects( this.scene.children );
    if (intersects.length) {
      var surface = intersects[0].object === this.element ? intersects[1] : intersects[0];
      this.element.position.copy(surface.point);
    }
  }

  mouseDown (e) {

  }

  mouseUp (e) {

  }
}