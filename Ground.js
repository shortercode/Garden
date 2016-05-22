'use strict';
class Ground {
  constructor (scene) {
    this.createTexture();
    this.createMaterial();
    this.createGeometry();
    this.createMesh();
  }
  set width (v) {
    this.texture.width = v * 2;
  }
  get width () {
    return this.texture.width;
  }
  set height (v) {
    this.texture.height = v * 2;
  }
  get height () {
    return this.texture.height;
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
    this.textureActual = new THREE.Texture(this.texture);
  }
  createMaterial () {
    this.material = new THREE.MeshLambertMaterial({
      map: this.textureActual
    });
  }
  createGeometry () {
    this.geometry = new THREE.PlaneGeometry(this.width, this.height);
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
