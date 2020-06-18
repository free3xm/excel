const CODES = {
  A: 65,
  Z: 90,
};

function createCell(text = '') {
  return `<div class="cell" contenteditable>${text}</div>`;
}

function createCol(element) {
  return `<div class="column">${element}</div>`;
}

function createRow(content, rowIndex = '') {
  return `
    <div class="row">
      <div class="row-info">${rowIndex}</div>
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
    .map((el, index) => createCol(toChar(CODES.A + index)))
    .join('');
  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill(createCell()).join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
