import htmlContextMenu from './index.html';
import htmlAttackMenu from './attack.html';
import htmlHealMenu from './heal.html';
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
import deleteWords from '../tasks/deleteWord';


const html = $(htmlContextMenu);
const attackHtml = $(htmlAttackMenu);
const healHtml = $(htmlHealMenu);
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
      break;
      case 'pazzleTask':
      let pazzleContent = taskContent.createPazzleContent();
      pazzles.render(pazzleContent);
      break;
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
      break;
      case 'translateTask':
      let translateContent = taskContent.createTranslateContent();
      translates.render(translateContent); 
      break;
      case 'deleteWordTask':
      let deleteWordContent = taskContent.createDeleteWordContent();
      deleteWords.render(deleteWordContent);
      break;
    }
  }
  renderChoice() {
    $('body').append(html);
    $('.placeModel').css('opacity', 0.3);
    html.find('.attack-spells').on('click', (e) => { this.renderAttackSpells() });
    html.find('.heal-spells').on('click', (e) => { this.renderHealSpells() });
  }
  renderAttackSpells() {
    html.remove();
    $('body').append(attackHtml);
    attackHtml.find('.spell-math').html('<span>Математика</span>');
    attackHtml.find('.spell-math').on('click', (e) => { this.createTask('mathTask') });
    attackHtml.find('.spell-comparison').html('<span>Сравнение</span>');
    attackHtml.find('.spell-comparison').on('click', (e) => { this.createTask('comparisonTask') });
    attackHtml.find('.spell-grammatic').html('<span>Грамматика</span>');
    attackHtml.find('.spell-grammatic').on('click', (e) => { this.createTask('grammaticTask') });
    attackHtml.find('.spell-translate').html('<span>Перевод</span>');
    attackHtml.find('.spell-translate').on('click', (e) => { this.createTask('translateTask') });
    attackHtml.find('.spell-sequence').html('<span>Продолжите ряд</span>');
    attackHtml.find('.spell-sequence').on('click', (e) => { this.createTask('sequenceTask') });
  }
  renderHealSpells() {
    html.remove();
    $('body').append(healHtml);
    healHtml.find('.spell-pazzle').html('<span>Загадка</span>');
    healHtml.find('.spell-pazzle').on('click', (e) => { this.createTask('pazzleTask') });
    healHtml.find('.spell-speech').html('speech');
    healHtml.find('.spell-speech').on('click', (e) => { this.createTask('speechTask') });
    healHtml.find('.spell-sort').html('sort');
    healHtml.find('.spell-sort').on('click', (e) => { this.createTask('sortTask') });
    healHtml.find('.spell-logic').html('logic');
    healHtml.find('.spell-logic').on('click', (e) => { this.createTask('logicTask') });
    healHtml.find('.spell-delete-word').html('4 лишний');
    healHtml.find('.spell-delete-word').on('click', (e) => { this.createTask('deleteWordTask') });
  }
}
let spellList = new spellComponent();
export default spellList;