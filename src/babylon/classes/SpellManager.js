import { addSpellButton } from "@/babylon/gui/spellButtons.js";

export class SpellManager {
  constructor(player, guiTexture) {
    this.player = player;
    this.guiTexture = guiTexture;
    this.spells = [];
    this.spellButtons = [];
  }

  addSpell(spell) {
    this.spells.push(spell);
    this.createSpellButton(spell);
  }

  removeSpell(spell) {
    const index = this.spells.indexOf(spell);
    if (index > -1) {
      this.spells.splice(index, 1);
      this.removeSpellButton(spell);
    }
  }

  removeAllSpells() {
    this.spells.forEach(spell => this.removeSpell(spell));
    this.spells = [];
    this.spellButtons = [];
  }

  createSpellButton(spell) {
    const button = addSpellButton(
      this.guiTexture,
      spell.name,
      `${this.spellButtons.length * 90}px`,
      () => {
        spell.selectTarget();
      },
      spell.cooldown * 1000
    );
    this.spellButtons.push(button);
  }

  removeSpellButton(spell) {
    const index = this.spells.indexOf(spell);
    if (index > -1) {
      this.spellButtons[index].dispose();
      this.spellButtons.splice(index, 1);
    }
  }

  setSpells(spells) {
    this.removeAllSpells();
    spells.forEach(spell => this.addSpell(spell));
  }
}