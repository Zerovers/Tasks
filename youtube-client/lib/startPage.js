import { renderElement } from './renderElement';

export default function startPage() {
  const wrapper = renderElement('div', { className: 'wrapper' });
  const form = renderElement('form', { className: 'blocks', action: '#', method: 'get' });
  const p = renderElement('p');
  const i = renderElement('i', { className: 'fas fa-search' });
  const input = renderElement('input', { className: 'search', type: 'text' });
  const matrix = renderElement('div', { className: 'matrix' });
  const body = document.querySelector('.body');
  p.appendChild(i);
  p.appendChild(input);
  form.appendChild(p);
  wrapper.appendChild(form);
  body.appendChild(wrapper);
  body.appendChild(matrix);
}
