import * as GUI from "babylonjs-gui";

/**
 * Creates a spell bar with up to 8 buttons, centered at the bottom of the screen.
 * @param {AdvancedDynamicTexture} guiTexture - The GUI texture to add the spell bar to.
 * @param {SpellManager} spellManager - The manager containing the spells.
 */
export function setSpellsGUI(guiTexture, spellManager) {
  // Create horizontal spell bar container
  const spellBar = new GUI.StackPanel("spellBar");
  spellBar.isVertical = false;
  spellBar.height = "100px";
  spellBar.width = "50%";
  spellBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  spellBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  spellBar.paddingBottom = "20px";
  spellBar.spacing = 10;
  guiTexture.addControl(spellBar);

  const maxButtons = 8;
  const displayedSpells = spellManager.spells.slice(0, maxButtons);

  displayedSpells.forEach((spell, index) => {
    const button = GUI.Button.CreateSimpleButton(`spellBtn_${index}`, spell.name);
    button.width = "100px";
    button.height = "60px";
    button.color = "white";
    button.background = "#2a2a2a";
    button.cornerRadius = 8;
    button.thickness = 2;
    button.fontSize = 14;
    button.paddingLeft = "4px";
    button.paddingRight = "4px";
    button.zIndex = 10;

    button.onPointerUpObservable.add(() => {
      console.log(`Casting ${spell.name}`);
      if (spell.selectTarget) {
        spell.selectTarget();
      }
    });

    spellBar.addControl(button);
  });

  return spellBar;
}
