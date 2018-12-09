export function renderTooltip(result, down, top) {
  const tooltip = renderElement('p', { className: 'tooltip', innerHTML: `${result}` });
  document.body.appendChild(tooltip);
  tooltip.style.left = `${down + 25}px`;
  tooltip.style.top = `${top - 25}px`;
}
export function renderElement(name, obj) {
  const element = document.createElement(name);
  Object.getOwnPropertyNames(obj).forEach((e) => {
    element[e] = obj[e];
  });
  return element;
}