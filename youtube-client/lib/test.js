import {
  mathPageToLeft,
  mathPageToRight,
} from './controller';
import {
  renderElement,
} from './renderElement';

test('Correct render Element', () => {
  const name = 'div';
  const obj = { className: 'test' };
  const element = renderElement(name, obj);
  expect(element.className).toBe('test');
});
test('event right on biggest screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const rightButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 5;
  const event = { target: fourButton };
  const obj = { rightButton, currentPage, event };
  expect(mathPageToRight(obj)).toBe(8);
});
test('event right on big screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const rightButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 7;
  const event = { target: thirdButton };
  const obj = { rightButton, currentPage, event };
  expect(mathPageToRight(obj)).toBe(9);
});
test('event right on medium screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const rightButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 11;
  const event = { target: secondButton };
  const obj = { rightButton, currentPage, event };
  expect(mathPageToRight(obj)).toBe(13);
});
test('event right on little screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const rightButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 21;
  const event = { target: firstButton };
  const obj = { rightButton, currentPage, event };
  expect(mathPageToRight(obj)).toBe(22);
});
test('event left on biggest screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const leftButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 5;
  const event = { target: fourButton };
  const obj = { leftButton, currentPage, event };
  expect(mathPageToLeft(obj)).toBe(2);
});
test('event left on big screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const leftButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 5;
  const event = { target: thirdButton };
  const obj = { leftButton, currentPage, event };
  expect(mathPageToLeft(obj)).toBe(3);
});
test('event left on medium screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const leftButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 5;
  const event = { target: secondButton };
  const obj = { leftButton, currentPage, event };
  expect(mathPageToLeft(obj)).toBe(3);
});
test('event left on little screen', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const leftButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 5;
  const event = { target: firstButton };
  const obj = { leftButton, currentPage, event };
  expect(mathPageToLeft(obj)).toBe(4);
});
test('When event left and page < 0', () => {
  const firstButton = {};
  const secondButton = {};
  const thirdButton = {};
  const fourButton = {};
  const leftButton = [firstButton, secondButton, thirdButton, fourButton];
  const currentPage = 2;
  const event = { target: fourButton };
  const obj = { leftButton, currentPage, event };
  expect(mathPageToLeft(obj)).toBe(0);
});
