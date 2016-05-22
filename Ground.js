'use strict';
class Ground {
  constructor (width, height) {
    this._width = width * 10;
    this._height = height * 10;
    this.createTexture();
    this.createMaterial();
    this.createGeometry();
    this.createMesh();
    this.updateGeometry();
  }
  set width (v) {
    this._width = v;
  }
  get width () {
    return this._width;
  }
  set height (v) {
    this._height = v;
  }
  get height () {
    return this._height;
  }
  updateGeometry () {
    this.geometry.dispose();
    this.createGeometry();
    this.updateTexture();
  }
  updateTexture () {
    this.textureActual.needsUpdate = true;
  }
  modifyTexture (fn) {
    fn(this.textureContext);
    this.updateTexture();
  }
  createTexture () {
    this.texture = document.createElement('canvas');
    this.textureContext = this.texture.getContext('2d');
    this.texture.width = 1024;
    this.texture.height = 1024;
    this.textureActual = new THREE.Texture(this.texture);
  }
  createMaterial () {
    this.material = new THREE.MeshLambertMaterial({
      map: this.textureActual
    });
  }
  createGeometry () {
    this.geometry = new THREE.PlaneGeometry(this._width, this._height);
    if (this.mesh)
      this.mesh.geometry = this.geometry;
  }
  createMesh () {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    //this.mesh.castShadow = true;
  }
}
