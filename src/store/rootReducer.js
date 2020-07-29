import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CURRENT_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE
} from './types';

export function rootReducer(state, action) {
  let field;
  let value;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'column' ? 'colState' : 'rowState';
      return { ...state, [field]: { ...state[field], ...action.data } };
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.text,
        dataState: { ...state.dataState, [action.data.id]: action.data.text },
      };
    case CURRENT_STYLES:
      return { ...state, currentStyles: action.data };

    case APPLY_STYLE:
      value = state.applyStyles || {};
      action.data.ids.forEach(id => {
        value[id] = { ...value[id], ...action.data.value };
      });

      return {
        ...state,
        applyStyles: { ...value },
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case CHANGE_TITLE:
      return { ...state, title: action.data };
    case UPDATE_DATE:
      return { ...state, date: new Date().toJSON() };
    default:
      return state;
  }
}
