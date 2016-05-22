'use strict';
class Screen {
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: false
    });
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 10000);
    this.element = this.renderer.domElement;
    this.element.style.cursor = 'none';
    this.element.shadowMapEnabled = true;
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.worldlight = new THREE.HemisphereLight(0x3284ff, 0xffffff, 0.6);
    this.scene.add(this.worldlight);
    this.scene.fog = new THREE.Fog(0xccf2ff, 1, 10000);
    this.bindevents();
    this.resize();
    this.theta = 0;
    this.rotation = new THREE.Vector2(0, 0);
    this.camera.position.set(100, 5, 100);
    this.camera.lookAt(this.scene.position);
    this.controls = new THREE.OrbitControls(this.camera, this.element);
    this.controls.minPolarAngle = Math.PI * 0.2; // radians
    this.controls.maxPolarAngle = Math.PI * 0.49; // radians
  }
  bindevents() {
    this.resize = this.resize.bind(this);
    this.redraw = this.redraw.bind(this);
    requestAnimationFrame(this.redraw);
    addEventListener('resize', this.resize, false);
    this.resize();
  }
  resize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }
  redraw() {
    requestAnimationFrame(this.redraw);
    this.renderer.render(this.scene, this.camera);
  }
}
