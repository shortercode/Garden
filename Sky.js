class Sky {
  constructor (radius, lightColor, fogColor) {
    this.createMaterial(lightColor, fogColor);
    this.createMesh(radius);
  }
  createMaterial (light, fog) {
    let vertexShader = ["varying vec3 vWorldPosition;", "void main() {", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "vWorldPosition = worldPosition.xyz;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join('');
    let fragmentShader = ["uniform vec3 topColor;", "uniform vec3 bottomColor;", "uniform float offset;", "uniform float exponent;", "varying vec3 vWorldPosition;", "void main() {", "float h = normalize( vWorldPosition + offset ).y;", "gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );", "}"].join('');
    let uniforms = {
      topColor: {
        type: "c",
        value: light
      },
      bottomColor: {
        type: "c",
        value: fog
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
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
    });
  }
  createMesh (radius) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      this.material
    );
  }
}
