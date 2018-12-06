import Enemy from 'index'

export function renderElement(name, obj) {
  const element = document.createElement(name);
  Object.getOwnPropertyNames(obj).forEach((e) => {
    element[e] = obj[e];
  });
  return element;
}

export function dmgEnemy(object, input) {
  object.enemy.getDamage();
  object.enemy.indicationHp();
  input.closest('div').remove();
}

export function dmgPlayer(object, input) {
  object.player.getDamage();
  object.player.indicationHp();
  input.closest('div').remove();
}

export function healPlayer(object, input) {
  object.player.getHeal();
  object.player.indicationHp();
  input.closest('div').remove();
}

export function createNewEnemy(object) {
  const rnd = getRandom(0, object.names.length);
  const enemy = new Enemy(object.names[rnd], 100);
  enemy.indicationHp();
  object.player.killMonsters();
  console.log(object.enemy.name);
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
