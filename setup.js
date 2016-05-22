{
  let ELEMENT;
  let BLACKOUT;
  function openDialog(fn) {
    ELEMENT = document.createElement('div');
    ELEMENT.className = 'setup';
    BLACKOUT = document.createElement('div');
    BLACKOUT.className = 'blackout';
    const title = document.createElement('div');
    title.textContent = 'Mint';
    ELEMENT.appendChild(title);
    const image = new Image();
    image.src = 'mint.png';
    ELEMENT.appendChild(image);
    document.body.appendChild(ELEMENT);
    document.body.appendChild(BLACKOUT);
    const longitude = createOption('longitude', 'number', 51.5074);
    const latitude = createOption('latitude', 'number', 0.1278);
    const width = createOption('width', 'number', 10);
    const height = createOption('height', 'number', 10);
    const submit = document.createElement('div');
    submit.className = 'submit';
    submit.textContent = 'Create';
    ELEMENT.appendChild(submit);
    submit.onclick = () => {
      document.body.removeChild(ELEMENT);
      document.body.removeChild(BLACKOUT);
      submit.onclick = null;
      fn({
        longitude: longitude.value,
        latitude: latitude.value,
        height: height.value,
        width: width.value
      });
    }
  }
  function createOption(name, type, value) {
    const label = document.createElement('label');
    const element = document.createElement('input');
    label.textContent = name;
    ELEMENT.appendChild(label);
    element.setAttribute('type', type);
    element.value = value;
    ELEMENT.appendChild(element);
    return element;
  }
}