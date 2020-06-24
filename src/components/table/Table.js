import { ExcelComponent } from '@core/ExcelComponent';
import { createTeable } from './table.template';
import { resizeHandler } from './table.resize';
import { shoudResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTeable(20);
  }

  init() {
    super.init();
    this.selection = new TableSelection();
    const cell = this.root.find('[data-id="0:0"');
    this.selectCell(cell);
    this.$on('formula:input', text => {
      this.selection.current.text = text;
    });
    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.$emit('table:select', cell);
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      resizeHandler(this.root, event);
    } else if (isCell(event)) {
      const cell = $(event.target);
      if (event.shiftKey) {
        const cells = matrix(cell, this.selection.current).map(id => {
          return this.root.find(`[data-id="${id}"]`);
        });
        this.selection.selectGroup(cells);
      } else {
        this.selection.select(cell);
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
    this.$emit('table:input', $(event.target));
  }
}
