import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(root, options) {
    super(root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.prepare();
    this.unsubs = [];
  }

  prepare() {}

  // return tempalte of component
  toHTML() {
    return this;
  }

  $on(event, fn) {
    const unsub = this.emitter.on(event, fn);
    this.unsubs.push(unsub);
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.unsubs.forEach(unsub => unsub());
    this.removeDOMListeners();
  }
}
