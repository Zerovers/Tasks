import { renderTooltip } from '../lib/renderAssist';

export function activeToolTip(setTimeoutConst, event) {
  setTimeoutConst = setTimeout(function () {
    const down = event.clientX;
    const top = event.clientY;
    if (event.target.hasAttribute('code')) {
      let tooltip = document.querySelector('.tooltip');
      let result = event.target.getAttribute('code');
      renderTooltip(result, down, top);
    }
  }, 1000);
  return setTimeoutConst;
}

export function removeToolTip(setTimeoutConst, setTimeoutConst2) {
  clearTimeout(setTimeoutConst);
 setTimeoutConst2 = setTimeout(function () {
 }, 500);
 let tooltip = document.querySelector('.tooltip');
 if (tooltip) {
   tooltip.remove();
 }
}