import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

import { createHPBar } from "./gui/healthBar";
import { createManaBar } from "./gui/manaBar";
import { createInventoryUI } from "@/babylon/gui/inventory.js";

import { Spell } from "@/babylon/classes/Spell.js";
import { getLastDirection } from "@/babylon/physics/direction.js";
import { Enemy } from "@/babylon/classes/Enemy.js";
import { Player } from "@/babylon/classes/Player.js";

import { generateGround } from "./setup/generateGround";
import { setupCamera } from "./setup/setupCamera";

export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const mapSize = 50;
  const offset = 5;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
  light.intensity = 0.7;

  // Ground
  generateGround(scene, mapSize, offset);

  // Player
  const player = new Player(scene, mapSize, offset);
  const playerMesh = player.getMesh();

  // Camera
  setupCamera(scene, canvas, playerMesh);

  // GUI
  const guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  createHPBar(guiTexture);
  createManaBar(guiTexture);

  createInventoryUI(guiTexture, (item) => {
    console.log(`Used item from inventory: ${item.name}`);
  });

  // Enemies
  const enemy1 = new Enemy(scene, new BABYLON.Vector3(0.5, 0.5, 0.5), guiTexture, 100, 100, [
    { direction: "left", delay: 1000, distance: 2 },
    { direction: "top", delay: 1000, distance: 1 },
    { direction: "right", delay: 1000, distance: 2 },
    { direction: "bottom", delay: 1000, distance: 1 },
  ]);
  enemy1.damage(30);
  enemy1.startPattern();

  // Spells
  new Spell({
    id: "fireball",
    name: "Fire",
    type: "fire",
    damage: 25,
    manaCost: 10,
    offset: "-50px",
    guiTexture,
    scene,
    playerMesh,
    direction: getLastDirection,
    cooldown: 1000,
  });

  new Spell({
    id: "iceball",
    name: "Ice",
    type: "ice",
    damage: 25,
    manaCost: 10,
    offset: "50px",
    guiTexture,
    scene,
    playerMesh,
    direction: getLastDirection,
    cooldown: 1000,
  });

  return scene;
}
