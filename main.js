'use strict';
(function () {
  const WORLD_RADIUS = 1000;

  const screen = new Screen();
  const scene = screen.scene;
  const camera = screen.camera;
  const element = screen.element;

  const sky = new Sky(WORLD_RADIUS, new THREE.Color(0x3284ff), new THREE.Color(0xccf2ff));
  scene.add(sky.mesh);

  const sun = new Sun(WORLD_RADIUS, 51.5074, 0.1278);
  scene.add(sun.object);
  scene.add(sun.light);

  const cursor = new Cursor(camera, scene);
  scene.add(cursor.element);

  cursor.ignored.add(sky);

  const ground = new Ground();
  scene.add(ground.mesh);

  {
    let mousedown = false;
    let grass = new Image();
    grass.src = 'grass.png';

    ground.width = 512;
    ground.height = 512;
    ground.updateGeometry();
    ground.modifyTexture(CTX => {
      CTX.fillStyle = 'white';
      CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
    });

    cursor.addEventListener('mousedown', e => {
      mousedown = e.object === ground.mesh;
      mousedown && paint (e);
    });
    cursor.addEventListener('mousemove', e => {
      mousedown = mousedown && e.object === ground.mesh;
      mousedown && paint (e);
    });
    cursor.addEventListener('mouseup', e => {
      mousedown = false;
    });
    function paint (e) {
      let x = e.point.x + 512;
      let y = e.point.z + 512;
    //  x *= 2;
    //  y *= 2;
      ground.modifyTexture(CTX => {
        CTX.drawImage(grass, x - 25, y - 25, 50, 50);
      });
    }
  }
  let time = 0;
  setInterval(() => {
    time += 0.05;
    time = time % 24;
    sun.hour = ~~time;
    sun.minute = (time % 1) * 60;
  }, 10);

  document.body.appendChild(element);
})();
