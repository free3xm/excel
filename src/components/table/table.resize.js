import { $ } from '@core/dom';

export function resizeHandler(root, event) {
  const resizer = $(event.target);
  const parent = resizer.closest('[data-type="resizable"]');
  const parentCoords = parent.getCoords();
  const type = resizer.data.resize;
  const sideProp = type === 'column' ? 'bottom' : 'right';
  let value;
  resizer.css({ opacity: 1, [sideProp]: '-5000px' });

  document.onmousemove = e => {
    if (type === 'column') {
      const delta = e.pageX - parentCoords.right;
      value = parentCoords.width + delta;
      resizer.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - parentCoords.bottom;
      value = parentCoords.height + delta;
      resizer.css({ bottom: -delta + 'px' });
    }
    document.onmouseup = () => {
      if (type === 'column') {
        parent.css({ width: value + 'px' });
        root.findAll(`[data-col="${parent.data.col}"]`).forEach(cell => {
          cell.style.width = value + 'px';
        });
      } else {
        parent.css({ height: value + 'px' });
      }
      resizer.css({ opacity: null, bottom: 0, right: 0 });
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
