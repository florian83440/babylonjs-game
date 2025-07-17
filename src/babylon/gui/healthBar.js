import * as GUI from "babylonjs-gui";

export function createHPBar(guiTexture) {
  const hpBg = new GUI.Rectangle();
  hpBg.width = "200px";
  hpBg.height = "30px";
  hpBg.cornerRadius = 10;
  hpBg.color = "white";
  hpBg.thickness = 2;
  hpBg.background = "grey";
  hpBg.top = "-40px";
  hpBg.left = "15px";
  hpBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  hpBg.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  const hpBar = new GUI.Rectangle();
  hpBar.width = "100%";
  hpBar.height = "100%";
  hpBar.cornerRadius = 10;
  hpBar.color = "transparent";
  hpBar.thickness = 0;
  hpBar.background = "red";

  hpBg.addControl(hpBar);
  guiTexture.addControl(hpBg);
}
