import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(root, options) {
    super(root, options.listeners);
    this.name = options.name || '';
  }

  // return tempalte of component
  toHTML() {
    return this;
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
