import { range } from '../../core/utils';

export function shoudResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix(current, selected) {
  const currentIds = current.id(true);
  const selcetedIds = selected.id(true);
  const cols = range(currentIds.column, selcetedIds.column);
  const rows = range(currentIds.row, selcetedIds.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, { row, column }) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row += 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      column += 1;
      break;
    case 'ArrowLeft':
      column -= 1;
      break;
    case 'ArrowUp':
      row -= 1;
      break;
    default:
      break;
  }

  return `[data-id="${row}:${column}"]`;
}
