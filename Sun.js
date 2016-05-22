'use strict';
class Sun {
  constructor (radius, lat, long) {
    this._radius = radius;
    this._latitude = lat || 0;
    this._longitude = long || 0;
    this._date = new Date();
    this.object = this.createObject();
    this.light = this.createLight();// create
    this.position = new THREE.Vector3();
    this.altitude = 0;
    this.azimuth = 0;
    this.updatePosition();
  }
  createObject () {
    let geometry = new THREE.SphereGeometry( 20, 16, 8 );
    let material = new THREE.MeshBasicMaterial( {color: 0xffffaa} );
    let sphere = new THREE.Mesh( geometry, material );
    return sphere;
  }
  createLight () {
    let spt = new THREE.DirectionalLight(0xFFFFFF);
    //spt.shadowBias = 0.001;
    spt.castShadow = true;
    spt.shadowCameraLeft = -50;
    spt.shadowCameraRight = 50;
    spt.shadowCameraTop = 50;
    spt.shadowCameraBottom = -50;
    //spt.exponent = 2.0;
    spt.penumbra = 0;
    spt.decay = 1;
    spt.distance = 2000;
    spt.shadow.mapSize.width = 2056;
    spt.shadow.mapSize.height = 2056;
    return spt;
  }
  updatePosition () {
    let sun = SunCalc.getPosition(this._date, this._latitude, this._longitude);
    let r = this.radius;
    let z = Math.sin(sun.altitude) * r;
    let x = Math.sqrt(r * r - z * z) * Math.cos(sun.azimuth);
    let y = Math.sqrt(r * r - z * z) * Math.sin(sun.azimuth);

    this.altitude = sun.altitude;
    this.azimuth = sun.azimuth;
    this.position.set(x, z, y);
    this.light.position.copy(this.position);
    this.light.lookAt(0, 0, 0);
    this.object.position.copy(this.position);
    //return;

    if (z >= -100) {
      this.light.shadowDarkness = 1;
      this.light.intensity = 1;
    } else {
      this.light.shadowDarkness = 0;
      this.light.intensity = 0;
    }
  }
  set radius (v) {
    this._radius = v;
    this.updatePosition();
  }
  get radius () {
    return this._radius;
  }
  set month (v) {
    this._date.setMonth(v - 1); // JS Date month starts at 0 not 1
    this.updatePosition();
  }
  get month () {
    return this._date.getMonth() + 1;
  }
  set day (v) {
    this._date.setDate(v); // JS Date day starts at 1
    this.updatePosition();
  }
  get day () {
    return this._date.getDate();
  }
  set hour (v) {
    this._date.setHours(v);
    this.updatePosition();
  }
  get hour () {
    return this._date.getHours();
  }
  set minute (v) {
    this._date.setMinutes(v);
    this.updatePosition();
  }
  get minute () {
    return this._date.getMinutes();
  }
  set latitude (v) {
    this._latitude = v;
    this.updatePosition();
  }
  get latitude () {
    return this._latitude;
  }
  set longitude (v) {
    this._longitude = v;
    this.updatePosition();
  }
  get longitude () {
    return this._longitude;
  }
}
