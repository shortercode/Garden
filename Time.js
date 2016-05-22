class Time {
  constructor (sun) {
    this.sun = sun;
    this.element = null;
    this.createElement();
  }
  createElement () {
    const element = document.createElement('div');
    element.className = 'time';
    this.element = element;
    const image = document.createElement('i');
    image.className = 'material-icons';
    image.textContent = 'access_time';
    image.style.cssText = 'display: block; font-size: 30px;';
    this.element.appendChild(image);
    const month = this.createInput('Month', 1, 12, this.sun.month, e => {
      e.stopPropagation();
      //this.cancelAuto();
      this.sun.month = e.target.value;
    });
    const day = this.createInput('Day', 1, 31, this.sun.day, e => {
      e.stopPropagation();
      //this.cancelAuto();
      this.sun.day = e.target.value;
    });
    const hour = this.createInput('Hour', 0, 23, this.sun.hour, e => {
      e.stopPropagation();
      //this.cancelAuto();
      this.sun.hour = e.target.value;
    });
    const minute = this.createInput('Minute', 0, 59, this.sun.minute, e => {
      e.stopPropagation();
      //this.cancelAuto();
      this.sun.minute = e.target.value;
    });
    const auto = this.createButton('Cycle', () => {
      if (this.auto) {
        auto.textContent = 'Cycle';
        this.cancelAuto();
      } else {
        auto.textContent = 'Cancel';
        this.setAuto();
      }
    });
  }
  createButton (a, fn) {
    const element = document.createElement('div');
    element.textContent = a;
    element.className = 'button';
    element.onclick = fn;
    this.element.appendChild(element);
    return element;
  }
  createInput (name, min, max, value, fn) {
    const label = document.createElement('div');
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
  setAuto () {
    let TIME = 0;
    this.auto = setInterval(() => {
      TIME += 0.05;
      TIME = TIME % 24;
      this.sun.hour = ~~TIME;
      this.sun.minute = (TIME % 1) * 60;
    }, 10);
  }
  cancelAuto () {
    clearInterval(this.auto);
    this.auto = null;
  }
}