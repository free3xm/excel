import { defaultStyles } from '@/constants';
import { toInlineStyles } from '../../core/utils';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(state, row) {
  return function (_, col) {
    const width = getWidth(state.colState, col);
    const text = getValue(state, row, col);
    const data = state.dataState[`${row}:${col}`];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...getStyles(state, row, col),
    });
    return `<div class="cell"
              contenteditable 
              data-col="${col}" 
              data-type="cell"
              data-id="${row}:${col}"
              data-value="${parse(data)}"
              style="${styles} ;width: ${width}">
              ${text}
            </div>`;
  };
}

function createCol(element, index, width = '') {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
      ${element}
      <div class="col-resize" data-resize="column"></div>
    </div>`;
}

function createRow(content, rowIndex = '', height = '') {
  const resize = rowIndex
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizable" data-row="${rowIndex}" style="height: ${height}" >
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

function toChar(index) {
  return String.fromCharCode(index);
}

function getValue({ dataState = {} } = {}, row, col) {
  return dataState[`${row}:${col}`] || '';
}

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function getStyles({ applyStyles = {} } = {}, row, col) {
  return applyStyles[`${row}:${col}`] || '';
}

export function createTeable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => {
      const width = getWidth(state.colState, index);
      return createCol(toChar(CODES.A + index), index, width);
    })
    .join('');
  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const height = getHeight(state.rowState, row + 1);
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('');
    rows.push(createRow(cells, row + 1, height));
  }

  return rows.join('');
}
