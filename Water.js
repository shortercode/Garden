class Water {
  constructor (renderer, camera, scene, sun, radius) {
    this.sun = sun;
    this.sunpos = new THREE.Vector3();
    const waterNormals = new THREE.TextureLoader().load( 'waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    this.water = new THREE.Water( renderer, camera, scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 	1.0,
      sunDirection: this.sunpos.copy(this.sun.position).normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 50.0,
    } );


    this.mirrorMesh = new THREE.Mesh(
      new THREE.CircleGeometry( radius, 32 ),
      this.water.material
    );

    this.position = this.mirrorMesh.position;

    this.mirrorMesh.add( this.water );
    this.mirrorMesh.rotation.x = - Math.PI * 0.5;
    scene.add( this.mirrorMesh );
  }

  update () {
    this.sunpos.copy(this.sun.position).normalize();
    this.water.material.uniforms.sunDirection.value = this.sunpos;
    this.water.material.uniforms.time.value += 1.0 / 60.0;
		this.water.render();
  }
}
