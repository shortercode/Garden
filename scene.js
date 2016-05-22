function loadscene(screen) {
  var scene = screen.scene,
    renderer = screen.renderer,
    camera = screen.camera,
    i,
    l;
  /*
  	Sun directional light
  */
  var spt = new THREE.DirectionalLight(0xFFFFFF);
  //spt.shadowBias = 0.001;
  spt.castShadow = true;
  spt.shadowCameraLeft = -1000;
  spt.shadowCameraRight = 1000;
  spt.shadowCameraTop = 1000;
  spt.shadowCameraBottom = -1000;
  //spt.exponent = 2.0;
  spt.penumbra = 0;
  spt.decay = 1;
  spt.distance = 2000;
  spt.shadow.mapSize.width = 1024;
  spt.shadow.mapSize.height = 1024;
  // shadow camera helper
  //spt.shadowCameraHelper = new THREE.CameraHelper(spt.shadow.camera); // colored lines
////  spt.shadow.camera.near = 0.1;
  ///spt.shadow.camera.far = 2000;
  //spt.shadow.camera.fov = (spt.angle * (360 / Math.PI));
  //lightHelper = new THREE.SpotLightHelper( spt );
  scene.add(spt);
  //scene.add(spt.shadowCameraHelper);
  //	scene.add( lightHelper );
  //window.sun = spt;
  var time = 0;
  setInterval(() => {
    time = (time + 0.01) % 23;
    var date = new Date();
    date.setHours(~~time, (time % 1) * 60);
    var pos = SunCalc.getPosition(date, lat, long);
    setSunPosition(pos.altitude, pos.azimuth);
  }, 16);

  function setSunPosition(h, t) {
    var r = 1000;
    var z = Math.sin(h) * r;
    var x = Math.sqrt(r * r - z * z) * Math.cos(t);
    var y = Math.sqrt(r * r - z * z) * Math.sin(t);
    spt.position.set(x, z, y);
    spt.lookAt(0, 0, 0);
  }
  /*
    Ground
  */
  var texture = new THREE.TextureLoader().load("./dirt.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);
  var geometry = new THREE.PlaneGeometry(1000, 1000);
  var material = new THREE.MeshLambertMaterial({
    map: texture
      //side: THREE.DoubleSide
  });
  var circle = new THREE.Mesh(geometry, material);
  circle.rotation.x = -Math.PI / 2;
  circle.receiveShadow = true;
  scene.add(circle);
}