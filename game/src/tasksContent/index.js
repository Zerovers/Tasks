import logicList from '../tasks/logic/logicList.json';
import pazzleList from '../tasks/pazzle/pazzleList.json';
import sortList from '../tasks/sort/sortList.json';
import speechList from '../tasks/speech/speechList.json';
import translateList from '../tasks/translate/translateList.json';

class tasksContent {
  createMathContent() {
    const sign = ['+', '-', '*', '/'];
    const outsign = sign[_.random(0, sign.length)];
    let firstNumber = _.random(0, 10);
    let secondNumber = _.random(0, 10);
    return { outsign, firstNumber, secondNumber}
  }
  createComparisonContent() {
    let sign;
    let firstNumber = _.random(1, 100);
    let secondNumber = _.random(1, 100);
    if (firstNumber > secondNumber) {
      sign = '>';
    } else if (firstNumber < secondNumber) {
      sign = '<';
    } else {
      sign = '=';
    }
    return { firstNumber, secondNumber, sign };
  }
  createLogicContent() {
    const list = Object.keys(logicList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = logicList[rndKeys];
    return { rndKeys, answer };
  }
  createPazzleContent() {
    const list = Object.keys(pazzleList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = pazzleList[rndKeys];
    console.log(answer);
    return { rndKeys, answer };
  }
  createSequenceContent() {
    const rndNumber = _.random(10, 100);
    const rndDiff = _.random(5, 10);
    return { rndNumber, rndDiff };
  }
  createSortContent() {
    const list = Object.keys(sortList);
    const rnd = _.random(0, list.length - 1);
    const rndKeys = list[rnd];
    const answer = sortList[list[rnd]];
    return { rndKeys, answer }
  }
  createSpeechContent() {
    const rnd = _.random(0, speechList.list.length - 1);
    return speechList.list[rnd];
  }
  createTranslateContent() {
    const list = Object.keys(translateList);
    const rnd = _.random(0, list.length);
    const rndKeys = list[rnd];
    const answer = translateList[rndKeys];
    return { rndKeys, answer };
  }
}
const taskContent = new tasksContent();
export default taskContent;