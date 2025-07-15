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

export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const mapSize = 50;
  const offset = 5;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
  light.intensity = 0.7;

  // GUI
  const guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  createHPBar(guiTexture);
  createManaBar(guiTexture);
  createCurrentTurnInfos(guiTexture);
  createInventoryUI(guiTexture, (item) => {
    console.log(`Used item from inventory: ${item.name}`);
  });

  // Ground
  generateGround(scene, mapSize, offset);

  // Enemies
  const enemyManager = generateEnemies(scene, mapSize, guiTexture);

  // Players
  const playerManager = generatePlayers(scene, mapSize, offset, guiTexture, enemyManager);

  const players = playerManager.getAllPlayers();

  const activePlayerMesh = players[0].getMesh();

  // Camera
  setupCamera(scene, canvas, activePlayerMesh);

  return scene;
}
