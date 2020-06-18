import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.element = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const elem = $.create('div', Component.className);
      const component = new Component(elem);
      elem.html(component.toHTML());
      root.append(elem);
      return component;
    });
    return root;
  }

  render() {
    this.element.append(this.getRoot());

    this.components.forEach(component => component.init());
  }
}