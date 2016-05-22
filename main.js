'use strict';
(function () {
  const WORLD_RADIUS = 1000;
  const screen = new Screen();
  const scene = screen.scene;
  const camera = screen.camera;
  const element = screen.element;
  const controls = screen.controls;

  const sky = new Sky(WORLD_RADIUS, new THREE.Color(0x3284ff), new THREE.Color(0xccf2ff));
  scene.add(sky.mesh);

  openDialog(o => {

    const sky = new Sky(WORLD_RADIUS, new THREE.Color(0x3284ff), new THREE.Color(0xccf2ff));
    scene.add(sky.mesh);

    const sun = new Sun(WORLD_RADIUS, +o.longitude, +o.latitude);
    scene.add(sun.object);
    scene.add(sun.light);

    const cursor = new Cursor(element, camera, scene);
    scene.add(cursor.element);

    //cursor.ignored.add(sky.mesh);

    const ground = new Ground(+o.width, +o.height);
    scene.add(ground.mesh);

    const time = new Time(sun);
    document.body.appendChild(time.element);

    const palette = new Palette(Tool.tools.get('paint'));
    palette.createItem('grass.png');
    palette.createItem('dirt.png');
    palette.createItem('gravel.png');
    palette.createItem('sand.png');
    document.body.appendChild(palette.element);

    Tool.setCursor(cursor);
    Tool.tools.get('orbit').controls = controls;
    Tool.tools.get('orbit').enable();

    Tool.tools.get('paint').ground = ground;

    scene.add(Tool.tools.get('measure').pointer);
    cursor.ignored.add(Tool.tools.get('measure').pointer);

    //ground.width = 512;
  //  ground.height = 512;
    //ground.updateGeometry();
    ground.modifyTexture(CTX => {
      CTX.fillStyle = 'white';
      CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
    });
  });

  document.body.appendChild(element);
})();
