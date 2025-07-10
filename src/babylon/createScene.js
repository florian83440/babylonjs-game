import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

import { createHPBar } from "./gui/healthBar";
import { createManaBar } from "./gui/manaBar";
import { createInventoryUI } from "@/babylon/gui/inventory.js";

import { Spell } from "@/babylon/classes/Spell.js";
import { Enemy } from "@/babylon/classes/Enemy.js";
import { Player } from "@/babylon/classes/Player.js";

import { generateGround } from "./setup/generateGround";
import { setupCamera } from "./setup/setupCamera";
import { EnemyManager } from "@/babylon/classes/EnemyManager.js";

export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const mapSize = 50;
  const offset = 5;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
  light.intensity = 0.7;

  // Ground
  generateGround(scene, mapSize, offset);

  // Player
  const player = new Player(scene, offset, mapSize/4, 1);
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
  const enemyManager = new EnemyManager();

  const enemy1 = new Enemy(
    scene,
    mapSize/4,
    0,
    10,
    guiTexture,
    100,
    100,
    10,
    {fire: true, ice: false, lightning: false, earth: true},
  );
  enemyManager.add(enemy1)

  // Spells
  const fireballSpell = new Spell({
    id: "fireball",
    name: "Fire",
    type: "fire",
    damage: 25,
    manaCost: 10,
    offset: "-50px",
    guiTexture,
    scene,
    playerMesh,
    cooldown: 1000,
    enemyManager,
    attacker: player
  });

  const iceballSpell = new Spell({
    id: "iceball",
    name: "Ice",
    type: "ice",
    damage: 25,
    manaCost: 10,
    offset: "50px",
    guiTexture,
    scene,
    playerMesh,
    cooldown: 1000,
    enemyManager,
    attacker: player
  });

  player.addSpell(fireballSpell);
  player.addSpell(iceballSpell);

  return scene;
}