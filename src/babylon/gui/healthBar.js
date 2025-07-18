import * as GUI from "babylonjs-gui";
import store from "@/store/index.js";

export function createHPBar(guiTexture) {
  let HP = store.state.playerStore.HP;
  let maxHP = store.state.playerStore.maxHP;

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

  const healthLabel = new GUI.TextBlock();
  healthLabel.color = "white";
  hpBg.addControl(healthLabel);

  guiTexture.addControl(hpBg);

  function updateHealthBar() {
    const healthPercentage = (HP / maxHP) * 100;
    hpBar.width = `${healthPercentage}%`;
    healthLabel.text = `${HP}`;
  }

  // Watch HP using the getter
  store.watch(
    () => store.getters["playerStore/HP"],
    (newHP) => {
      HP = newHP;
      updateHealthBar();
    },
    { immediate: true }
  );

  // Watch maxHP using the getter
  store.watch(
    () => store.getters["playerStore/maxHP"],
    (newMaxHP) => {
      maxHP = newMaxHP;
      updateHealthBar();
    },
    { immediate: true }
  );

  return hpBg;
}
