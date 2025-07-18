import * as GUI from "babylonjs-gui";
import store from "@/store";

export function createPlayerInfoGUI(guiTexture) {
  const playerInfoContainer = new GUI.Rectangle();
  playerInfoContainer.width = "200px";
  playerInfoContainer.height = "150px"; // Increased height to accommodate the new label
  playerInfoContainer.cornerRadius = 10;
  playerInfoContainer.color = "White";
  playerInfoContainer.thickness = 2;
  playerInfoContainer.background = "Black";
  playerInfoContainer.top = "15px";
  playerInfoContainer.left = "-15px";
  playerInfoContainer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  playerInfoContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  const nameLabel = new GUI.TextBlock();
  nameLabel.text = `Name: ${store.state.playerStore.name}`;
  nameLabel.color = "white";
  nameLabel.height = "30px";
  nameLabel.top = "-40px";
  playerInfoContainer.addControl(nameLabel);

  const levelLabel = new GUI.TextBlock();
  levelLabel.text = `Level: ${store.state.playerStore.level}`;
  levelLabel.color = "white";
  levelLabel.height = "30px";
  levelLabel.top = "0px";
  playerInfoContainer.addControl(levelLabel);

  const classLabel = new GUI.TextBlock();
  classLabel.text = `Class: ${store.getters["playerStore/playerClass"] ? store.getters["playerStore/playerClass"].name : "None"}`;
  classLabel.color = "white";
  classLabel.height = "30px";
  classLabel.top = "40px";
  playerInfoContainer.addControl(classLabel);

  guiTexture.addControl(playerInfoContainer);

  store.watch(
    (state) => state.playerStore.name,
    (newName) => {
      nameLabel.text = `Name: ${newName}`;
    },
    { immediate: true }
  );

  store.watch(
    (state) => state.playerStore.level,
    (newLevel) => {
      levelLabel.text = `Level: ${newLevel}`;
    },
    { immediate: true }
  );

  store.watch(
    (state) => store.getters["playerStore/playerClass"],
    (newClass) => {
      classLabel.text = `Class: ${newClass ? newClass.name : "None"}`;
    },
    { immediate: true }
  );
}
