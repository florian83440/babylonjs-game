import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

import { createHPBar } from "./gui/healthBar";
import { createManaBar } from "./gui/manaBar";
import { createInventoryUI } from "@/babylon/gui/inventory.js";
import { generateGround } from "./setup/generateGround";
import { setupCamera } from "./setup/setupCamera";
import { generatePlayers } from "@/babylon/setup/playersSetup.js";
import { generateEnemies } from "@/babylon/setup/enemiesSetup.js";
import { createCurrentTurnInfos } from "@/babylon/gui/currentTurn.js";
import { createPlayerInfoGUI } from "@/babylon/gui/playerInfo.js";

export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const mapSize = 50;
  const offset = 5;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
  light.intensity = 0.7;

  // Ground
  generateGround(scene, mapSize, offset);

  // GUI
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);

  // Enemies
  const enemyManager = generateEnemies(scene, mapSize, advancedTexture);

  // Players
  const playerManager = generatePlayers(scene, mapSize, offset, advancedTexture, enemyManager);

  const players = playerManager.getAllPlayers();

  const activePlayerMesh = players[0].getMesh();

  // Camera
  setupCamera(scene, canvas, activePlayerMesh);

  // Create GUI elements
  createHPBar(advancedTexture);
  createManaBar(advancedTexture);
  createPlayerInfoGUI(advancedTexture, playerManager, enemyManager);

  //createCurrentTurnInfos(advancedTexture);

  createInventoryUI(advancedTexture, (item) => {
    console.log(`Used item from inventory: ${item.name}`);
  });

  return scene;
}
