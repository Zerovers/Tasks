import './index.css';
import htmlMath from './index.html';
import BattleArena from '../../../screens/battle';

let inputValue;
const html = $(htmlMath);
export default class MathTask {
  static render(data) {
    const [firstNumber, secondNumber] = [data.firstNumber, data.secondNumber];
    const [outSign] = [data.outsign];
    $('.attack-spells-list').remove();
    $('body').append(html);
    html.find('#math__input').val('');
    html.find('.math__operations').html(`${firstNumber} ${outSign} ${secondNumber} = <span>?</span>`);
    html.find('#math__input').focus();
    const result = MathTask.getMathOperation(firstNumber, secondNumber, outSign);
    html.find('#form__math').submit(() => {
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
        result = Math.round((firstNumber / secondNumber) * 10) / 10;
        break;
      default:
    }
    return result;
  }

  static deleteTask() {
    html.remove();
  }

  static async getAnswerTask(result) {
    inputValue = $('#math__input').val();
    $('.shadow').css('display', 'none');
    $('.button__start-fight').prop('disabled', false);
    if (inputValue === `${result}`) {
      MathTask.deleteTask();
      BattleArena.startFight('attack', 'true', 'frostbolt');
    } else {
      MathTask.deleteTask();
      BattleArena.startFight('attack', 'false');
    }
  }
}
