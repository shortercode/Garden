{
  const SIZE = 128;
  const HALF_SIZE = SIZE / 2;

  const GRADIENT = document.createElement('canvas');
  const GTX = GRADIENT.getContext('2d');

  const BUFFER = document.createElement('canvas');
  const CTX = BUFFER.getContext('2d');

  BUFFER.width = SIZE;
  BUFFER.height = SIZE;

  GRADIENT.width = SIZE;
  GRADIENT.height = SIZE;

  function generateGradient(hardness) {
    GTX.clearRect(0, 0, SIZE, SIZE);
    const gradient = GTX.createRadialGradient(HALF_SIZE, HALF_SIZE, HALF_SIZE, HALF_SIZE, HALF_SIZE, HALF_SIZE * hardness);
    gradient.addColorStop(0,"rgba(0,0,0,0)");
    gradient.addColorStop(1,"rgba(0,0,0,1)");
    GTX.fillStyle = gradient;
    GTX.fillRect(0, 0, SIZE, SIZE);
  }

  window.generateBrush = function generateBrush(src, hardness) {
    const IMAGE = new Image();
    const OUTPUT = {
      image: null,
      onload: null
    };
    generateGradient(hardness);
    const gradData = GTX.getImageData(0, 0, SIZE, SIZE);
    IMAGE.src = src;
    IMAGE.onload = () => {
      CTX.clearRect(0, 0, SIZE, SIZE);
      CTX.drawImage(IMAGE, 0, 0, SIZE, SIZE);
      const imagData = CTX.getImageData(0, 0, SIZE, SIZE);
      for (let i = 0, l = gradData.data.length; i < l; i += 4) {
        imagData.data[i + 3] = gradData.data[i + 3];
      }
      CTX.putImageData(imagData, 0, 0);
      OUTPUT.image = new Image();
      OUTPUT.image.src = BUFFER.toDataURL();
      OUTPUT.onload && OUTPUT.onload();
    }
    return OUTPUT;
  }
}