import htmlContextMenu from './index.html'
import css from './index.css';
import taskContent from '../tasksContent/index';
import mathEvent from '../tasks/mathEvent/index';

const html = $(htmlContextMenu);
class spellComponent {
  createTask(name) {
    switch(name) {
      case 'mathTask':
      let mathContent = taskContent.createMathContent();
      mathEvent.render(mathContent);    
    }
  }
  render() {
    $('body').append(html);
    html.find('.spell-math').html('Math');
    html.find('.spell-math').on('click', (e) => { this.createTask('mathTask') });
    html.find('.spell-comparison').html('comparison');
    html.find('.spell-comparison').on('click', (e) => { this.createTask('comparisonTask') });
    html.find('.spell-grammatic').html('Grammatic');
    html.find('.spell-translate').html('Translate');
    html.find('.spell-sequence').html('sequence');
    html.find('.spell-pazzle').html('pazzle');
    html.find('.spell-speech').html('speech');
    html.find('.spell-sort').html('sort');
    html.find('.spell-logic').html('logic');
  }
}

let spellList = new spellComponent();
export default spellList;