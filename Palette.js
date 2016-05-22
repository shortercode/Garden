class Palette {
  constructor (paintTool) {
    this.tool = paintTool;
    this.element = null;
    this.selected = null;
    this.createElement();
    this.createInput('size', 10, 500, 50, e => {
      this.tool.size = e.target.value;
    });
  }
  createElement () {
    const element = document.createElement('div');
    element.className = 'palette';
    this.element = element;
    const image = document.createElement('i');
    image.className = 'material-icons';
    image.textContent = 'format_paint';
    image.style.cssText = 'display: block; font-size: 30px;';
    this.element.appendChild(image);
  }
  createInput (name, min, max, value, fn) {
    const label = document.createElement('label');
    const element = document.createElement('input');
    label.textContent = name;
    this.element.appendChild(label);
    element.setAttribute('type', 'number');
    element.setAttribute('min', min || 0);
    element.setAttribute('max', max || 0);
    //element.setAttribute('value', value || 0);
    element.value = value;
    element.onchange = fn;
    this.element.appendChild(element);
    return element;
  }
  createItem (src) {
    const element = document.createElement('div');
    const texture = generateBrush(src, 0.6);
    let brush = null;
    element.onclick = () => {
      if (this.selected)
        this.selected.classList.remove('selected');
      this.selected = element;
      element.classList.add('selected');
      if (!brush) {
        if (!texture.image) {
          texture.onload = () => {
            brush = texture.image;
            this.tool.texture = brush;
          }
        } else {
          brush = texture.image;
        }
      }
      this.tool.texture = brush;
    };
    if (!this.selected)
      element.onclick();
    element.style.backgroundImage = 'url(' + src + ')';
    this.element.appendChild(element);
    return element;
  }
}