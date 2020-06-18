import { ExcelComponent } from '@core/ExcelComponent';
import { createTeable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['input'],
    });
  }

  toHTML() {
    return createTeable(20);
  }
}
