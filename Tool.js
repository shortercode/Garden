
class Tool {
  constructor () {
    this.cursor = null;
    this.active = false;
    this.icon = null;
    this.eventMap = new Map();
    this.bindEvents();
  }
  enable () {
    if (this.active)
      return;
    this.active = true;
    Tool.selected = this;
    this.icon.classList.add('selected');
    this.attachEvent('mousedown');
    this.attachEvent('mousemove');
    this.attachEvent('mouseup');
  }
  disable () {
    if (!this.active)
      return;
    this.active = false;
    Tool.selected = null;
    this.icon.classList.remove('selected');
    this.detachEvent('mousedown');
    this.detachEvent('mousemove');
    this.detachEvent('mouseup');
  }
  attachEvent (name) {
    this.cursor.addEventListener(name, this.eventMap.get(name));
  }
  detachEvent (name) {
    this.cursor.removeEventListener(name, this.eventMap.get(name));
  }
  bindEvents () {
    this.eventMap.set('mousedown', e => this.mouseDown(e));
    this.eventMap.set('mousemove', e => this.mouseMove(e));
    this.eventMap.set('mouseup', e => this.mouseUp(e));
  }
  mouseDown () {

  }
  mouseMove () {

  }
  mouseUp () {

  }
  static addTool (name, iconName, instance) {
    const element = document.createElement('i');
    element.textContent = iconName;
    element.className = "material-icons";
    element.title = name;
    Tool.toolbar.appendChild(element);
    instance.icon = element;
    element.onclick = () => {
      if (Tool.selected === instance)
        return;
      Tool.selected && Tool.disableAll();
      instance.enable();
    }
    Tool.tools.set(name, instance);
  }
  static disableAll () {
    for (let tool of Tool.tools.values()) {
      tool.disable();
    }
  }
  static setCursor (cursor) {
    for (let tool of Tool.tools.values()) {
      tool.cursor = cursor;
    }
  }
}
Tool.selected = null;
Tool.tools = new Map();
Tool.toolbar = null;
{
  const element = document.createElement('div');
  element.className = 'toolbar';
  document.body.appendChild(element);
  Tool.toolbar = element;
}