import getMathСalculation from '../utility/MathValue';

test('adds 5 + 7 to equal 12', () => {
  const firstNumber = 5;
  const secondNumber = 7;
  const outsign = '+';
  const data = { firstNumber, secondNumber, outsign };
  expect(getMathСalculation(data)).toBe(12);
});
test('subtract 12 - 5 to equal 7', () => {
  const firstNumber = 12;
  const secondNumber = 5;
  const outsign = '-';
  const data = { firstNumber, secondNumber, outsign };
  expect(getMathСalculation(data)).toBe(7);
});
test('multiply 7 * 9 to equal 63', () => {
  const firstNumber = 7;
  const secondNumber = 9;
  const outsign = '*';
  const data = { firstNumber, secondNumber, outsign };
  expect(getMathСalculation(data)).toBe(63);
});
test('devide 5 / 7 to equal 2', () => {
  const firstNumber = 12;
  const secondNumber = 5;
  const outsign = '/';
  const data = { firstNumber, secondNumber, outsign };
  expect(getMathСalculation(data)).toBe(2);
});
