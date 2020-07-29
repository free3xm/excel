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
    return this.el.textContent.trim();
  }

  set text(text) {
    this.el.textContent = text;
  }

  get value() {
    return this.el.value;
  }

  set value(value) {
    this.el.value = value;
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

  clear() {
    this.html('');
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach(style => {
      this.el.style[style] = styles[style];
    });
    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.el.style[style];
      return res;
    }, {});
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

  attr(name, value) {
    if (value) {
      this.el.setAttribute(name, value);
      return this;
    }
    return this.el.getAttribute(name);
  }

  focus() {
    this.el.focus();
    return this;
  }

  addClass(className) {
    this.el.classList.add(className);
    return this;
  }

  toggleClass(className) {
    this.el.classList.toggle(className);
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
