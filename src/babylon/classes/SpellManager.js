export class SpellManager {
  constructor(player, guiTexture) {
    this.player = player;
    this.guiTexture = guiTexture;
    this.spells = [];
    this.spellButtons = [];
  }

  /**
   * Adds a new spell to the manager and creates its corresponding GUI button.
   * @param {object} spell - The spell object to add.
   */
  addSpell(spell) {
    this.spells.push(spell);
  }

  /**
   * Removes a spell from the manager and disposes of its GUI button.
   * @param {object} spell - The spell object to remove.
   */
  removeSpell(spell) {
    const index = this.spells.indexOf(spell);
    if (index > -1) {
      this.spells.splice(index, 1);
      this.removeSpellButton(spell);
    }
  }

  /**
   * Removes all spells and their associated GUI buttons.
   */
  removeAllSpells() {
    // Iterate through spellButtons and dispose of their containers
    this.spellButtons.forEach(({ container }) => {
      if (container) {
        container.dispose();
      }
    });
    this.spells = [];
    this.spellButtons = [];
  }

  /**
   * Removes the GUI button associated with a given spell.
   * @param {object} spell - The spell object whose button needs to be removed.
   */
  removeSpellButton(spell) {
    const index = this.spells.indexOf(spell);
    if (index > -1) {
      // Dispose of the container when removing the button
      if (this.spellButtons[index].container) {
        this.spellButtons[index].container.dispose();
      }
      this.spellButtons.splice(index, 1);
    }
  }

  /**
   * Sets the spells for the manager, replacing any existing spells.
   * @param {Array<object>} spells - An array of spell objects to set.
   */
  setSpells(spells) {
    this.removeAllSpells(); // Clear existing spells and buttons
    spells.forEach((spell) => this.addSpell(spell));
  }

}