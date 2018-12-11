import htmlContextMenu from './index.html'
import css from './index.css';
import taskContent from '../tasksContent/index';
import mathematics from '../tasks/mathematic';
import comparisons from '../tasks/comparison';
import grammatics from '../tasks/grammatic';
import logics from '../tasks/logic';
import pazzles from '../tasks/pazzle';
import sequences from '../tasks/sequence';
import sorts from '../tasks/sort';
import speechs from '../tasks/speech';
import translates from '../tasks/translate';


const html = $(htmlContextMenu);
class spellComponent {
  createTask(name) {
    switch(name) {
      case 'mathTask':
      let mathContent = taskContent.createMathContent();
      mathematics.render(mathContent);
      break;
      case 'comparisonTask':
      let comparisonContent = taskContent.createComparisonContent();
      comparisons.render(comparisonContent);
      break;
      case 'grammaticTask':
      grammatics.render();
      break;
      case 'logicTask':
      let logicContent = taskContent.createLogicContent();
      logics.render(logicContent);
      case 'pazzleTask':
      let pazzleContent = taskContent.createPazzleContent();
      pazzles.render(pazzleContent);
      case 'sequenceTask':
      let sequenceContent = taskContent.createSequenceContent();
      sequences.render(sequenceContent);
      break;
      case 'sortTask':
      let sortContent = taskContent.createSortContent();
      sorts.render(sortContent);
      break;
      case 'speechTask':
      let speechContent = taskContent.createSpeechContent();
      speechs.render(speechContent);
      case 'translateTask':
      let translateContent = taskContent.createTranslateContent();
      translates.render(translateContent);
      break;
    }
  }
  render() {
    $('body').append(html);
    html.find('.spell-math').html('Math');
    html.find('.spell-math').on('click', (e) => { this.createTask('mathTask') });
    html.find('.spell-comparison').html('comparison');
    html.find('.spell-comparison').on('click', (e) => { this.createTask('comparisonTask') });
    html.find('.spell-grammatic').html('Grammatic');
    html.find('.spell-grammatic').on('click', (e) => { this.createTask('grammaticTask') });
    html.find('.spell-translate').html('Translate');
    html.find('.spell-translate').on('click', (e) => { this.createTask('translateTask') });
    html.find('.spell-sequence').html('sequence');
    html.find('.spell-sequence').on('click', (e) => { this.createTask('sequenceTask') });
    html.find('.spell-pazzle').html('pazzle');
    html.find('.spell-pazzle').on('click', (e) => { this.createTask('pazzleTask') });
    html.find('.spell-speech').html('speech');
    html.find('.spell-speech').on('click', (e) => { this.createTask('speechTask') });
    html.find('.spell-sort').html('sort');
    html.find('.spell-sort').on('click', (e) => { this.createTask('sortTask') });
    html.find('.spell-logic').html('logic');
    html.find('.spell-logic').on('click', (e) => { this.createTask('logicTask') });
    
  }
}

let spellList = new spellComponent();
export default spellList;