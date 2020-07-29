import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    const initalState = defaultStyles;
    this.initState(initalState);
  }

  init() {
    super.init();
    this.$on('toolbar:styles', styles => {
      this.setState(styles);
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const target = $(event.target);
    if (target.data.type === 'button') {
      const value = JSON.parse(target.data.value);
      this.$emit('toolbar:applyStyle', value);

      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
    }
  }
}
