export class DamageCalculator {
  constructor() {}

  calculateDamage(attacker, defender, spell) {
    let damage = spell.damage;

    // Check for elemental advantages
    if (this._isEffective(spell.type, defender.elementalResistance)) {
      damage *= 1.5; // 50% more damage
    } else if (this._isResisted(spell.type, defender.elementalResistance)) {
      damage *= 0.5; // 50% less damage
    }

    // Consider attacker's attack power and defender's defense
    damage = damage * (attacker.getAttack() / defender.defense);

    // Ensure damage is not negative
    damage = Math.max(0, damage);

    return Math.floor(damage); // Return damage as an integer
  }

  _isEffective(attackType, defenseResistance) {
    return defenseResistance[attackType] === false;
  }

  _isResisted(attackType, defenseResistance) {
    return defenseResistance[attackType] === true;
  }
}
