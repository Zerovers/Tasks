import './index.css';
import htmlContextMenu from './index.html';
import htmlAttackMenu from './attack.html';
import htmlHealMenu from './heal.html';
import MathTask from '../tasks/mathematic';
import ComparisonTask from '../tasks/comparison';
import SortTask from '../tasks/sort';
import TranslateTask from '../tasks/translate';
import SequenceTask from '../tasks/sequence';
import PazzleTask from '../tasks/pazzle';
import SpeechTask from '../tasks/speech';
import GrammaticTask from '../tasks/grammatic';
import LogicTask from '../tasks/logic';
import DeleteWordTask from '../tasks/deleteWord';
import TasksData from '../../utility/TaskData';
import { MAIN_BODY } from '../../constant';
import getMathСalculation from '../../utility/MathValue';

const html = $(htmlContextMenu);
const attackHtml = $(htmlAttackMenu);
const healHtml = $(htmlHealMenu);
export default class SpellFactory {
  static createTask(name) {
    const mathData = TasksData.createMathData();
    const mathResult = getMathСalculation(mathData);
    const comparisonData = TasksData.createComparisonData();
    const logicData = TasksData.createLogicData();
    const pazzleData = TasksData.createPazzleData();
    const sequenceData = TasksData.createSequenceData();
    const sortData = TasksData.createSortData();
    const speechData = TasksData.createSpeechData();
    const translateData = TasksData.createTranslateData();
    const deleteWordData = TasksData.createDeleteWordData();
    switch (name) {
      case 'mathTask':
        MathTask.render({ mathData, mathResult });
        break;
      case 'comparisonTask':
        ComparisonTask.render(comparisonData);
        break;
      case 'sortTask':
        SortTask.render(sortData);
        break;
      case 'translateTask':
        TranslateTask.render(translateData);
        break;
      case 'sequenceTask':
        SequenceTask.render(sequenceData);
        break;
      case 'pazzleTask':
        PazzleTask.render(pazzleData);
        break;
      case 'speechTask':
        SpeechTask.render(speechData);
        break;
      case 'grammaticTask':
        GrammaticTask.render();
        break;
      case 'logicTask':
        LogicTask.render(logicData);
        break;
      case 'deleteWordTask':
        DeleteWordTask.render(deleteWordData);
        break;
      default:
    }
  }

  static renderChoice() {
    $(MAIN_BODY).append(html);
    html.find('.spell__attack').on('click', () => { SpellFactory.renderAttackSpells(); });
    html.find('.spell__heal').on('click', () => { SpellFactory.renderHealSpells(); });
  }

  static renderAttackSpells() {
    html.remove();
    $(MAIN_BODY).append(attackHtml);
    attackHtml.find('.spell-math').html('<span>Математика</span>');
    attackHtml.find('.spell-math').on('click', () => { SpellFactory.createTask('mathTask'); });
    attackHtml.find('.spell-comparison').html('<span>Сравнение</span>');
    attackHtml.find('.spell-comparison').on('click', () => { SpellFactory.createTask('comparisonTask'); });
    attackHtml.find('.spell-sort').html('<span>Собрать</span>');
    attackHtml.find('.spell-sort').on('click', () => { SpellFactory.createTask('sortTask'); });
    attackHtml.find('.spell-translate').html('<span>Перевод</span>');
    attackHtml.find('.spell-translate').on('click', () => { SpellFactory.createTask('translateTask'); });
    attackHtml.find('.spell-sequence').html('<span>Продолжите ряд</span>');
    attackHtml.find('.spell-sequence').on('click', () => { SpellFactory.createTask('sequenceTask'); });
  }

  static renderHealSpells() {
    html.remove();
    $(MAIN_BODY).append(healHtml);
    healHtml.find('.spell-pazzle').html('<span>Загадка</span>');
    healHtml.find('.spell-pazzle').on('click', () => { SpellFactory.createTask('pazzleTask'); });
    healHtml.find('.spell-speech').html('<span>Произношение</span>');
    healHtml.find('.spell-speech').on('click', () => { SpellFactory.createTask('speechTask'); });
    healHtml.find('.spell-grammatic').html('<span>Грамматика</span>');
    healHtml.find('.spell-grammatic').on('click', () => { SpellFactory.createTask('grammaticTask'); });
    healHtml.find('.spell-logic').html('<span>Логика</span>');
    healHtml.find('.spell-logic').on('click', () => { SpellFactory.createTask('logicTask'); });
    healHtml.find('.spell-delete-word').html('4 лишний');
    healHtml.find('.spell-delete-word').on('click', () => { SpellFactory.createTask('deleteWordTask'); });
  }
}
