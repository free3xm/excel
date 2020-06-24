class Dom {
  constructor(selector) {
    this.el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
      return this;
    }
    return this.el.outerHTML.trim();
  }

  get text() {
    return this.el.textContent;
  }

  set text(text) {
    this.el.textContent = text;
  }

  clear() {
    this.html();
    return this;
  }

  on(eventType, callback) {
    this.el.addEventListener(eventType, callback);
    return this;
  }

  remove(eventType, callback) {
    this.el.removeEventListener(eventType, callback);
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.el;
    }
    this.el.append(node);
    return this;
  }

  closest(selector) {
    return $(this.el.closest(selector));
  }

  getCoords() {
    return this.el.getBoundingClientRect();
  }

  get data() {
    return this.el.dataset;
  }

  findAll(selector) {
    return this.el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.el.querySelector(selector));
  }

  css(styles = {}) {
    Object.keys(styles).forEach(style => {
      this.el.style[style] = styles[style];
    });
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        column: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.el.focus();
    return this;
  }

  addClass(className) {
    this.el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.el.classList.remove(className);
    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
