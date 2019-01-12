import logicList from '../components/tasks/logic/logicList.json';
import pazzleList from '../components/tasks/pazzle/pazzleList.json';
import sortList from '../components/tasks/sort/sortList.json';
import speechList from '../components/tasks/speech/speechList.json';
import translateList from '../components/tasks/translate/translateList.json';
import grammaticList from '../components/tasks/grammatic/grammaticList.json';
import deleteWordList from '../components/tasks/deleteWord/deleteWordList.json';

const _ = require('lodash');

export default class TasksData {
  static createMathData() {
    const sign = ['+', '-', '*', '/'];
    const outsign = sign[_.random(0, sign.length - 1)];
    const firstNumber = _.random(0, 10);
    const secondNumber = _.random(0, 10);
    return { outsign, firstNumber, secondNumber };
  }

  static createComparisonData() {
    let sign;
    const firstNumber = _.random(1, 100);
    const secondNumber = _.random(1, 100);
    if (firstNumber > secondNumber) {
      sign = '>';
    } else if (firstNumber < secondNumber) {
      sign = '<';
    } else {
      sign = '=';
    }
    return { firstNumber, secondNumber, sign };
  }

  static createSortData() {
    const list = Object.keys(sortList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = sortList[list[rnd]];
    return { rndKeys, answer };
  }

  static createTranslateData() {
    const list = Object.keys(translateList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = translateList[rndKeys];
    return { rndKeys, answer };
  }

  static createSequenceData() {
    const rndNumber = _.random(10, 100);
    const rndDiff = _.random(5, 10);
    return { rndNumber, rndDiff };
  }

  static createPazzleData() {
    const list = Object.keys(pazzleList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = pazzleList[rndKeys];
    return { rndKeys, answer };
  }

  static createSpeechData() {
    const rnd = _.random(0, speechList.list.length - 1);
    return speechList.list[rnd];
  }

  static createGrammaticData() {
    const rnd = _.random(0, grammaticList.list.length - 1);
    return grammaticList.list[rnd];
  }

  static createLogicData() {
    const list = Object.keys(logicList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = logicList[rndKeys];
    return { rndKeys, answer };
  }

  static createDeleteWordData() {
    const list = Object.keys(deleteWordList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = deleteWordList[rndKeys];
    return { rndKeys, answer };
  }
}
