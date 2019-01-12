export default function getMathСalculation(data) {
  const [
    firstNumber,
    secondNumber,
    operation] = [data.firstNumber, data.secondNumber, data.outsign];
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
