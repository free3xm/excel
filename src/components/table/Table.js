import { ExcelComponent } from '@core/ExcelComponent';
import { createTeable } from './table.template';
import { resizeHandler } from './table.resize';
import { shoudResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import { tableResize } from '@/store/actions';
import { changeText, applyStyle, changeStyles } from '../../store/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscibe: [],
      ...options,
    });
  }

  toHTML() {
    return createTeable(20, this.store.getState());
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    const cell = this.root.find('[data-id="0:0"');
    this.selectCell(cell);
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(applyStyle({ value, ids: this.selection.selectedIds }));
    });
    this.$on('formula:input', text => {
      this.selection.current.attr('data-value', text).text = parse(text);
      this.updateTextInStore(text);
    });
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit('table:select', cell);
    const styles = cell.getStyles(Object.keys(defaultStyles));
    this.$emit('toolbar:styles', styles);
    this.$dispatch(changeStyles(styles));
  }

  async resizeTable(event, type) {
    try {
      const data = await resizeHandler(this.root, event);
      this.$dispatch(tableResize(data));
    } catch (error) {
      console.log(error);
    }
  }

  updateTextInStore(text) {
    this.$dispatch(changeText({ text, id: this.selection.current.id() }));
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const cell = $(event.target);
      if (event.shiftKey) {
        const cells = matrix(cell, this.selection.current).map(id => {
          return this.root.find(`[data-id="${id}"]`);
        });
        this.selection.selectGroup(cells);
      } else {
        this.selectCell(cell);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
    ];
    const key = event.key;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.id(true);
      const cellId = nextSelector(key, current);
      const cell = this.root.find(cellId);
      if (cell.el) {
        this.selectCell(cell);
      }
    }
  }

  onInput(event) {
    const text = $(event.target).text;
    this.updateTextInStore(text);
  }
}
