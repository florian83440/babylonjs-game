import * as GUI from "babylonjs-gui";
import store from "@/store";

let manaBar;

export function createManaBar(guiTexture) {
  let MP = store.state.playerStore.MP;
  let maxMP = store.state.playerStore.maxMP;

  const manaBg = new GUI.Rectangle();
  manaBg.width = "200px";
  manaBg.height = "20px";
  manaBg.cornerRadius = 10;
  manaBg.color = "white";
  manaBg.thickness = 2;
  manaBg.background = "grey";
  manaBg.top = "-15px";
  manaBg.left = "15px";
  manaBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  manaBg.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  manaBar = new GUI.Rectangle();
  manaBar.width = "0%";
  manaBar.height = "100%";
  manaBar.cornerRadius = 10;
  manaBar.color = "transparent";
  manaBar.thickness = 0;
  manaBar.background = "#3399ff";

  manaBg.addControl(manaBar);

  const manaLabel = new GUI.TextBlock();
  manaLabel.color = "white";
  manaBg.addControl(manaLabel);

  guiTexture.addControl(manaBg);

  function updateManaBar() {
    const manaPercentage = (MP / maxMP) * 100;
    console.log(MP);
    console.log(maxMP);
    manaBar.width = `${manaPercentage}%`;
    manaLabel.text = `${MP}`;
  }

  // Watch MP using the getter
  store.watch(
    () => store.getters["playerStore/MP"],
    (newMP) => {
      MP = newMP;
      updateManaBar();
    },
    { immediate: true }
  );

  // Watch maxMP using the getter
  store.watch(
    () => store.getters["playerStore/maxMP"],
    (newMaxMP) => {
      maxMP = newMaxMP;
      updateManaBar();
    },
    { immediate: true }
  );

  return manaBg;
}
