export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  select(el) {
    this.clear();
    el.focus().addClass('selected');
    this.group.push(el);
    this.current = el;
  }

  clear() {
    this.group.forEach(cell => cell.removeClass('selected'));
    this.group = [];
  }

  selectGroup(cells) {
    this.clear();
    this.group.push(...cells);
    cells.forEach(cell => cell.addClass('selected'));
  }
}
