function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class tasksContent {
  createMathContent() {
    const sign = ['+', '-', '*', '/'];
    const outsign = sign[getRandom(0, sign.length)];
    let firstNumber = getRandom(0, 10);
    let secondNumber = getRandom(0, 10);
    return { outsign, firstNumber, secondNumber}
  }
}

const taskContent = new tasksContent();
export default taskContent;