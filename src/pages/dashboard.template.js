import { storage } from '@core/utils';

export function toHTML(record) {
  const model = storage(record);
  const [excel, param] = record.split(':');
  const date = new Date(model.date);
  return `<li class="db__record">
            <a href="#${excel}/${param}">Table 1</a>  
            <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong>
        </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
  }
  return keys;
}

export function getAllRecords() {
  const keys = getAllKeys();
  if (!keys.length) return "<p>Нou haven't created any tables yet</p>";

  return `<div class="db__list-header">
            <span>Name</span>
            <span>Open date</span>
          </div>
          <ul class="db__list">
            ${keys.map(toHTML).join('')}
          </ul>`;
}
