import * as GUI from "babylonjs-gui";

export function createCurrentTurnInfos(guiTexture) {
  const currentTurnInfo = new GUI.TextBlock();
  currentTurnInfo.text = "Current Turn: Player 1";
  currentTurnInfo.color = "white";
  currentTurnInfo.fontSize = "24px";

  currentTurnInfo.left = "10px";
  currentTurnInfo.top = "10px";
  currentTurnInfo.paddingLeft = "10px";
  currentTurnInfo.paddingTop = "10px";
  currentTurnInfo.paddingRight = "10px";
  currentTurnInfo.paddingBottom = "10px";
  currentTurnInfo.background = "rgba(0, 0, 0, 0.5)"; // semi-transparent background
  currentTurnInfo.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  currentTurnInfo.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  currentTurnInfo.fontFamily = "Arial, sans-serif";

  guiTexture.addControl(currentTurnInfo);

  return currentTurnInfo;
}
