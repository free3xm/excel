import { Page } from '@core/Page';
import { Excel } from '@/components/excel/excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/store/createStore';
import { rootReducer } from '@/store/rootReducer';
import { storage } from '@core/utils';
import { debounce } from '@core/utils';
import { normalizeInitialState } from '../store/initialState';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const initialState = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(initialState));
    const stateListener = debounce(
      state => {
        storage(storageName(params), state);
      },

      300,
    );
    store.subscribe(state => {
      stateListener(state);
    });
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
