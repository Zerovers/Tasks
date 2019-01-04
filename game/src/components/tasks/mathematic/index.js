import './index.css';
import htmlMath from './index.html';
import BattleArena from '../../../screens/battle';
import {
  BUTTON_START_FIGHT,
  SHADOW_FRAME,
  MAIN_BODY,
  ATTACK_SPELL_LIST,
} from '../../../constant';

let inputValue;
const html = $(htmlMath);
const INPUT_MATH = '#math-form__input';
export default class MathTask {
  static render(data) {
    const [
      firstNumber,
      secondNumber,
      outSign,
      result,
    ] = [
      data.mathData.firstNumber,
      data.mathData.secondNumber,
      data.mathData.outsign,
      data.mathResult,
    ];
    $(ATTACK_SPELL_LIST).remove();
    $(MAIN_BODY).append(html);
    html.find(INPUT_MATH).val('').focus();
    html.find('.math-content__operations').html(`${firstNumber} ${outSign} ${secondNumber} = <span>?</span>`);
    html.find('.math-form').submit(() => {
      MathTask.getAnswerTask(result);
      return false;
    });
  }

  static getMathOperation(firstNumber, secondNumber, outSign) {
    const operation = outSign;
    let result = 0;
    switch (operation) {
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = Math.round(firstNumber / secondNumber);
        break;
      default:
    }
    return result;
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    inputValue = $(INPUT_MATH).val();
    $(SHADOW_FRAME).css('display', 'none');
    $(BUTTON_START_FIGHT).prop('disabled', false);
    if (inputValue === `${result}`) {
      MathTask.deleteTask();
      BattleArena.startBattle('attack', 'true', 'frostbolt');
    } else {
      MathTask.deleteTask();
      BattleArena.startBattle('attack', 'false');
    }
  }
}
