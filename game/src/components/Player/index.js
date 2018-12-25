import css from './index.css';
import playerHead from './image/player_head.png';
import playerBody from './image/player_body.png';
import playerRightHand from './image/player_rightHand.png';
import playerLeftHand from './image/player_leftHand.png';
import playerLeftFinger from './image/player_leftFinger.png';
import playerRightLeg from './image/player_rightLeg.png';
import playerLeftLeg from './image/player_leftLeg.png';
import playerWeapon from './image/player_weapon.png';

import playerSpellFrostbolt from './image/spells/spell_frostbolt.png';
import playerSpellFireball from './image/spells/spell_fireball.png';
import playerSpellArcaneblast from './image/spells/spell_arcaneblast.png';
import playerSpellArcaneMissile from './image/spells/spell_arcanemissle.png';
import playerSpellShadowbolt from './image/spells/spell_shadowbolt.png';
import playerSpellHealAura from './image/spells/spell_heal_aura.png';

import spellSoundFrostbolt from './sounds/frostbolt.wav';
import spellSoundFireball from './sounds/fireball.wav';
import spellSoundArcaneBlast from './sounds/arcaneblast.wav';
import spellSoundArcaneMissile from './sounds/arcanemissile.wav';
import spellSoundShadowbolt from './sounds/shadowbolt.wav';
import spellSoundPlayerTakeDamage from './sounds/player_take_damage.wav';
import spellSoundHeal from './sounds/heal.wav';

import pause from '../utils/index';

export default class Player {
  constructor(name, hp, countMonsters) {
    this.name = name;
    this.hp = hp;
    this.countMonsters = countMonsters;
    this.getDmg = 20;
    $('.player > p.player-name').html(name);
  }
  indicationHp() {
    $('.player-hp span').css('width', `${this.hp * 5}px`);
  }
  killMonsters() {
    this.countMonsters += 1;
  }
  getDamage() {
    this.hp -= this.getDmg;
    $('.player-hp > span').css('width', `${this.hp*5}px`);
    $('.player-hp').css('animation', 'shake 1s linear');
    this.addAnimationTakeDamage();
  }
  getHeal() {
    this.hp += 20;
    if (this.hp >= 100) {
      this.hp = 100;
    }
    $('.player-hp > span').css('width', `${this.hp*5}px`);
    $('.heal').css('visibility', 'hidden');
  }
  reset() {
    this.hp = 100;
    this.getDmg = 20;
    this.countMonsters = 0;
    this.indicationHp();
  }
  renderBody() {
    $('.conteiner').append(`<img src="${playerBody}" alt="mageBody" class="mage-body">`);
    $('.conteiner').append(`<img src="${playerHead}" alt="mageBody" class="mage-head activeHead">`);
    $('.conteiner').append(`<img src="${playerLeftLeg}" alt="mageBody" class="mage-leftLeg">`);
    $('.conteiner').append(`<img src="${playerRightLeg}" alt="mageBody" class="mage-RightLeg">`);
    $('.conteiner').append(`<img src="${playerRightHand}" alt="mageBody" class="mage-rightHand">`);
    $('.conteiner').append(`<img src="${playerLeftHand}" alt="mageBody" class="mage-leftHand">`);
    $('.conteiner').append(`<img src="${playerLeftFinger}" alt="mageBody" class="mage-leftFinger">`);
    $('.conteiner').append(`<img src="${playerWeapon}" alt="mageBody" class="mage-weapon">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellFrostbolt}" alt="spell_frostbolt" class="spell frostbolt">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellFireball}" alt="spell_fireball" class="spell fireball">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellArcaneblast}" alt="spell_arcaneblast" class="spell arcaneblast">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellArcaneMissile}" alt="spell_arcanemissle" class="spell arcanemissile">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellShadowbolt}" alt="spell_shadowbolt" class="spell shadowbolt">`);
    $('.player-Model .conteiner ').append(`<img src="${playerSpellHealAura}" alt="spell_heal" class="heal">`);
  }
  async addAnimationAttack(name) {
    $('.placeModel').css('opacity', 1);
    $('.mage-body').addClass('mage-body_active');
    $('.mage-leftHand').addClass('mage-leftHand_active');
    $('.mage-rightHand').addClass('mage-rightHand_active');
    $('.mage-leftFinger').addClass('mage-leftFinger_active');
    $('.mage-leftLeg').addClass('mage-leftLeg_active');
    $('.mage-weapon').addClass('mage-weapon_active');
    this.addSound(name);
    await pause(1000);
    switch(name) {
      case 'frostbolt':
      $('.spell.frostbolt').css('visibility', 'visible');
      break;
      case 'fireball':
      $('.spell.fireball').css('visibility', 'visible');
      break;
      case 'arcaneblast':
      $('.spell.arcaneblast').css('visibility', 'visible');
      break;
      case 'arcanemissile':
      $('.spell.arcanemissile').css('visibility', 'visible');
      break;
      case 'shadowbolt':
      $('.spell.shadowbolt').css('visibility', 'visible');
      break;

    }
    await pause(100);
    const position = $('.enemy-Model .conteiner').position().left;
    $('.spell').css('left', position-20);
  }
  async addAnimationTakeDamage() {
    $('.mage-head').removeClass('activeHead');
    $('.mage-head').addClass('mage-take-damage_head');
    $('.mage-body').addClass('mage-take-damage_body');
    $('.mage-leftHand').addClass('mage-take-damage_leftHand');
    $('.mage-rightHand').addClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').addClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').addClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').addClass('mage-take-damage_leftLeg');
    $('.mage-weapon').addClass('mage-take-damage_weapon');
    this.addSound('takeDamage');
    await pause(500);
    $('.mage-head').addClass('activeHead');
  }
  addAnimationHealing() {
    $('.placeModel').css('opacity', 1);
    $('.mage-leftHand').addClass('mage-take-heal_leftHand');
    $('.mage-rightHand').addClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').addClass('mage-take-heal_leftFinger');
    $('.mage-weapon').addClass('mage-take-heal_weapon');
    $('.heal').css('visibility', 'visible');
    this.addSound('heal');
  }
  removeAnimationAttack() {
    $('.mage-body').removeClass('mage-body_active');
    $('.mage-leftHand').removeClass('mage-leftHand_active');
    $('.mage-rightHand').removeClass('mage-rightHand_active');
    $('.mage-leftFinger').removeClass('mage-leftFinger_active');
    $('.mage-leftLeg').removeClass('mage-leftLeg_active');
    $('.mage-weapon').removeClass('mage-weapon_active');
  }
  removeAnimationTakeDamage() {
    $('.mage-head').removeClass('mage-take-damage_head');
    $('.mage-body').removeClass('mage-take-damage_body');
    $('.mage-leftHand').removeClass('mage-take-damage_leftHand');
    $('.mage-rightHand').removeClass('mage-take-damage_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-damage_leftFinger');
    $('.mage-leftLeg').removeClass('mage-take-damage_rightLeg');
    $('.mage-leftLeg').removeClass('mage-take-damage_leftLeg');
    $('.mage-weapon').removeClass('mage-take-damage_weapon');
  }
  removeAnimationHealing() {
    $('.mage-leftHand').removeClass('mage-take-heal_leftHand');
    $('.mage-rightHand').removeClass('mage-take-heal_rightHand');
    $('.mage-leftFinger').removeClass('mage-take-heal_leftFinger');
    $('.mage-weapon').removeClass('mage-take-heal_weapon');
  }
  removeAnimations() {
    this.removeAnimationAttack();
    this.removeAnimationHealing();
    this.removeAnimationTakeDamage();
  }
  addSound(name) {
    switch(name) {
      case 'takeDamage':
      const takeDamage = new Audio(`${spellSoundPlayerTakeDamage}`);
      takeDamage.play();
      break;
      case 'frostbolt':
      const frostbolt = new Audio(`${spellSoundFrostbolt}`);
      frostbolt.volume = 0.2;
      frostbolt.play();
      break;
      case 'fireball':
      const fireball = new Audio(`${spellSoundFireball}`);
      fireball.volume = 0.2;
      fireball.play();
      break;
      case 'arcaneblast':
      const arcaneblast = new Audio(`${spellSoundArcaneBlast}`);
      arcaneblast.volume = 0.2;
      arcaneblast.play();
      break;
      case 'arcanemissile':
      const arcanemissle = new Audio(`${spellSoundArcaneMissile}`);
      arcanemissle.volume = 0.2;
      arcanemissle.play();
      case 'shadowbolt':
      const shadowbolt = new Audio(`${spellSoundShadowbolt}`);
      shadowbolt.volume = 0.2;
      shadowbolt.play();
      case 'heal':
      const heal = new Audio(`${spellSoundHeal}`);
      heal.play();
      break;
    }
  }
};
