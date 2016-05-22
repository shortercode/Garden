'use strict';
const long = 51.5287352;
const lat = -0.3817817;
Doom.define("screen", class screen {
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
    this.scene.fog = new THREE.Fog(0xccf2ff, 1, 5000);
    this.bindevents();
    this.loadskybox();
    //this.loadsamplebox();
    loadscene(this);
    this.resize();
    this.theta = 0;
    this.rotation = new THREE.Vector2(0, 0);
    this.camera.position.set(100, 5, 100);
    this.camera.lookAt(this.scene.position);
    var CONTROLS = new THREE.OrbitControls(this.camera, this.element);
    CONTROLS.minPolarAngle = Math.PI * 0.2; // radians
    CONTROLS.maxPolarAngle = Math.PI * 0.49; // radians
    var CURSOR = new Cursor(this.camera, this.scene);
  }
  bindevents() {
    this.resize = this.resize.bind(this);
    this.redraw = this.redraw.bind(this);
    requestAnimationFrame(this.redraw);
    addEventListener('resize', this.resize, false);
    this.resize();
  }
  loadskybox() {
    var vertexShader, fragmentShader, uniforms, sky;
    vertexShader = ["varying vec3 vWorldPosition;", "void main() {", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "vWorldPosition = worldPosition.xyz;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join('');
    fragmentShader = ["uniform vec3 topColor;", "uniform vec3 bottomColor;", "uniform float offset;", "uniform float exponent;", "varying vec3 vWorldPosition;", "void main() {", "float h = normalize( vWorldPosition + offset ).y;", "gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );", "}"].join('');
    uniforms = {
      topColor: {
        type: "c",
        value: this.worldlight.color
      },
      bottomColor: {
        type: "c",
        value: this.scene.fog.color
      },
      offset: {
        type: "f",
        value: 33
      },
      exponent: {
        type: "f",
        value: 1
      }
    };
    sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 32), new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
    }));
    this.scene.add(sky);
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
});
Doom.create({
  alloy: "screen",
  parent: document.body
});