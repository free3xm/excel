const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row) {
  return function (text = '', col) {
    return `<div class="cell"
              contenteditable 
              data-col="${col}" 
              data-type="cell"
              data-id="${row}:${col}">
              ${text}
            </div>`;
  };
}

function createCol(element, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${element}
      <div class="col-resize" data-resize="column"></div>
    </div>`;
}

function createRow(content, rowIndex = '') {
  const resize = rowIndex
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row" data-type="resizable">
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

export function createTeable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => createCol(toChar(CODES.A + index), index))
    .join('');
  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(createCell(row)).join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
