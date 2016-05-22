class Cursor {

  constructor (canvas, camera, scene) {
    this.camera = camera;
    this.scene = scene;
    this.element = this.createElement();
    this.element.castShadow = true;
    this.mouse = new THREE.Vector2();
    this.caster = new THREE.Raycaster();
    this.bindMouse(canvas);
    this.eventMap = new Map([
      ['mousedown', []],
      ['mousemove', []],
      ['mouseup', []]
    ]);
    this.ignored = new Set();
    this.ignored.add(this.element);
  }

  createElement () {
    var geometry = new THREE.SphereGeometry( 5, 16, 8 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    return sphere;
  }

  bindMouse (canvas) {
    canvas.addEventListener('mousedown', e => this.processMouse('mousedown', e));
    canvas.addEventListener('mousemove', e => this.processMouse('mousemove', e));
    canvas.addEventListener('mouseup', e => this.processMouse('mouseup', e));
  }

  processMouse (eventName, e) {
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  	this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    this.caster.setFromCamera( this.mouse, this.camera );
    var intersects = this.caster.intersectObjects( this.scene.children );
    if (intersects.length) {
      for (let o of intersects) {
        if (!this.ignored.has(o.object)) {
          this.element.position.copy(o.point);
          o.shiftKey = e.shiftKey;
          this.dispatchEvent(eventName, o);
          break;
        }
      }
    }
  }

  addEventListener (eventName, fn) {
    const eventList = this.eventMap.get(eventName);
    if (eventList) {
      eventList.push(fn);
    }
  }

  removeEventListener (eventName, fn) {
    const eventList = this.eventMap.get(eventName);
    if (eventList) {
      const i = eventList.indexOf(fn);
      if (~i)
        eventList.splice(i, 1);
    }
  }

  dispatchEvent (eventName, eventObject) {
    const eventList = this.eventMap.get(eventName);
    if (eventList) {
      for (let event of eventList) {
        event(eventObject);
      }
    }
  }

}
