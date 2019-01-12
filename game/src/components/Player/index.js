import './index.css';
import React from 'react';
import pause from '../../utility/pause';

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

let MAGE_HEAD = 'mage-head activeHead';
let MAGE_BODY = 'mage-body';
let MAGE_RIGHT_LEG= 'mage-RightLeg';
let MAGE_LEFT_LEG= 'mage-leftLeg';
let MAGE_RIGHT_HAND= 'mage-rightHand';
let MAGE_LEFT_HAND= 'mage-leftHand';
let MAGE_LEFT_FINGER= 'mage-leftFinger';
let MAGE_WEAPON = 'mage-weapon';
export default class Player extends React.Component {
  attackAnimation = async (spellName) => {
    MAGE_HEAD = 'mage-head mage-head_active';
    MAGE_BODY = 'mage-body mage-body_active';
    MAGE_RIGHT_LEG= 'mage-RightLeg mage-RightLeg_active';
    MAGE_LEFT_LEG= 'mage-leftLeg mage-leftLeg_active';
    MAGE_RIGHT_HAND= 'mage-rightHand mage-rightHand_active';
    MAGE_LEFT_HAND= 'mage-leftHand mage-leftHand_active';
    MAGE_LEFT_FINGER= 'mage-leftFinger mage-leftFinger_active';
    MAGE_WEAPON = 'mage-weapon mage-weapon_active';
    this.addSound(spellName);
    await pause(1000);
    this.props.resetResultBattle('');
    switch(spellName) {
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
      default:
    }
    const position = $('.enemy-Model .conteiner').position().left;
    $('.spell').css('left', position - 20);
    await pause(500);
    $('.spell').css('visibility', 'hidden');
    $('.spell').css('left', 305);
    this.props.enemyTakeDamage('take', 50);
  }

  animationHealing = async () => {
    MAGE_RIGHT_HAND= 'mage-rightHand mage-take-heal_rightHand';
    MAGE_LEFT_HAND= 'mage-leftHand mage-take-heal_leftHand';
    MAGE_LEFT_FINGER= 'mage-leftFinger mage-take-heal_leftFinger';
    MAGE_WEAPON = 'mage-weapon mage-take-heal_weapon';
    this.addSound('heal');
    $('.heal').css('visibility', 'visible');
    await pause(1000);
    this.props.resetResultBattle('');
    this.props.playerHealing();
  }

  takeDamage = async () => {
    MAGE_HEAD = 'mage-head mage-take-damage_head';
    MAGE_BODY = 'mage-body mage-take-damage_body';
    MAGE_RIGHT_LEG= 'mage-RightLeg mage-take-damage_rightLeg';
    MAGE_LEFT_LEG= 'mage-leftLeg mage-take-damage_leftLeg';
    MAGE_RIGHT_HAND= 'mage-rightHand mage-take-damage_rightHand';
    MAGE_LEFT_HAND= 'mage-leftHand mage-take-damage_leftHand';
    MAGE_LEFT_FINGER= 'mage-leftFinger mage-take-damage_leftFinger';
    MAGE_WEAPON = 'mage-weapon mage-take-damage_weapon';
    this.addSound('takeDamage')
    await pause(500);
    this.props.playerTakeDamage('', 50);
    this.props.resetResultBattle('');
  }


  resetAnimation = () => {
    MAGE_HEAD = 'mage-head activeHead';
    MAGE_BODY = 'mage-body';
    MAGE_RIGHT_LEG= 'mage-RightLeg';
    MAGE_LEFT_LEG= 'mage-leftLeg';
    MAGE_RIGHT_HAND= 'mage-rightHand';
    MAGE_LEFT_HAND= 'mage-leftHand';
    MAGE_LEFT_FINGER= 'mage-leftFinger';
    MAGE_WEAPON = 'mage-weapon'; 
  }

  addSound = (name) => {
    const takeDamage = new Audio(`${spellSoundPlayerTakeDamage}`);
    const frostbolt = new Audio(`${spellSoundFrostbolt}`);
    const fireball = new Audio(`${spellSoundFireball}`);
    const arcaneblast = new Audio(`${spellSoundArcaneBlast}`);
    const arcanemissle = new Audio(`${spellSoundArcaneMissile}`);
    const shadowbolt = new Audio(`${spellSoundShadowbolt}`);
    const heal = new Audio(`${spellSoundHeal}`);
    switch (name) {
      case 'takeDamage':
        takeDamage.play();
        break;
      case 'frostbolt':
        frostbolt.volume = 0.2;
        frostbolt.play();
        break;
      case 'fireball':
        fireball.volume = 0.2;
        fireball.play();
        break;
      case 'arcaneblast':
        arcaneblast.volume = 0.2;
        arcaneblast.play();
        break;
      case 'arcanemissile':
        arcanemissle.volume = 0.2;
        arcanemissle.play();
        break;
      case 'shadowbolt':
        shadowbolt.volume = 0.2;
        shadowbolt.play();
        break;
      case 'heal':
        heal.play();
        break;
      default:
    }
  }

  render() {
    if (this.props.resultBattle === 'playerAttack') {
      this.attackAnimation(this.props.spellName);
    } else if (this.props.resultBattle === 'playerHeal') {
      this.animationHealing()
    } else if (this.props.playerTakeDamageState === 'playerTakeDamage') {
      this.takeDamage();
    } else {
      this.resetAnimation();
    }
    return (
      <>
        <div className='player-Model'>
          <div className='conteiner'>
            <img src={playerBody} alt="mageBody" className={MAGE_BODY} />
            <img src={playerHead} alt="mageBody" className={MAGE_HEAD} />
            <img src={playerLeftLeg} alt="mageBody" className={MAGE_LEFT_LEG} />
            <img src={playerRightLeg} alt="mageBody" className={MAGE_RIGHT_LEG} />
            <img src={playerRightHand} alt="mageBody" className={MAGE_RIGHT_HAND} />
            <img src={playerLeftHand} alt="mageBody" className={MAGE_LEFT_HAND} />
            <img src={playerLeftFinger} alt="mageBody" className={MAGE_LEFT_FINGER} />
            <img src={playerWeapon} alt="mageBody" className={MAGE_WEAPON} />
            <img src={playerSpellFrostbolt} alt="spell_frostbolt" className="spell frostbolt" />
            <img src={playerSpellFireball} alt="spell_fireball" className="spell fireball" />
            <img src={playerSpellArcaneblast} alt="spell_arcaneblast" className="spell arcaneblast" />
            <img src={playerSpellArcaneMissile} alt="spell_arcanemissle" className="spell arcanemissile" />
            <img src={playerSpellShadowbolt} alt="spell_shadowbolt" className="spell shadowbolt" />
            <img src={playerSpellHealAura} alt="spell_heal" className="heal" />
          </div>
        </div>
      </>
    )
  }
}