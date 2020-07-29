import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '../../store/actions';
import { ActiveRoute } from '@core/router/ActiveRoute';
export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || '';
    return `<input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>`;
  }

  onClick(event) {
    const target = $(event.target);
    if (target.data.button === 'remove') {
      const decision = window.confirm('Do you want delete this table?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.params);
        ActiveRoute.navigate('');
      }
    } else if (target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  onInput(event) {
    const target = $(event.target);
    this.$dispatch(changeTitle(target.value));
  }
}
