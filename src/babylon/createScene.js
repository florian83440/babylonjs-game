import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { createHPBar } from "./gui/healthBar";
import { createManaBar } from "./gui/manaBar";
import { createInventoryUI } from "@/babylon/gui/inventory.js";
import { Spell } from "@/babylon/classes/Spell.js";
import { getLastDirection, updateDirectionFromKey } from "@/babylon/physics/direction.js";
import { Enemy } from "@/babylon/classes/Enemy.js";

export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  const mapSize = 50;
  const offset = 5;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
  light.intensity = 0.7;

  const baseGround = BABYLON.MeshBuilder.CreateGround("base", { width: 10, height: 10 }, scene);
  baseGround.isVisible = false;

  const size = 1;
  for (let x = 0; x < mapSize / 2; x++) {
    for (let z = 0; z < mapSize / 2; z++) {
      const tile = BABYLON.MeshBuilder.CreateGround(
        `tile_${x}_${z}`,
        { width: size, height: size },
        scene
      );
      tile.position.x = x - offset + 0.5;
      tile.position.z = z - offset + 0.5;

      const mat = new BABYLON.StandardMaterial(`mat_${x}_${z}`, scene);
      mat.diffuseColor = new BABYLON.Color3(0.1, 0.65, 0.1);
      tile.material = mat;

      const lines = BABYLON.MeshBuilder.CreateLines(
        `border_${x}_${z}`,
        {
          points: [
            new BABYLON.Vector3(tile.position.x - 0.5, 0.01, tile.position.z - 0.5),
            new BABYLON.Vector3(tile.position.x + 0.5, 0.01, tile.position.z - 0.5),
            new BABYLON.Vector3(tile.position.x + 0.5, 0.01, tile.position.z + 0.5),
          ],
        },
        scene
      );

      const lineMaterial = new BABYLON.StandardMaterial(`lineMat_${x}_${z}`, scene);
      lineMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      lineMaterial.alpha = 0.05;
      lines.material = lineMaterial;
    }
  }

  const box = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, scene);
  const tileX = 1;
  const tileZ = 1;
  box.position.set(tileX - offset + 0.5, 0.5, tileZ - offset + 0.5);
  let playerX = tileX,
    playerZ = tileZ;

  window.addEventListener("keydown", (e) => {
    const pos = updateDirectionFromKey(e.key, { x: playerX, z: playerZ }, mapSize);
    playerX = pos.x;
    playerZ = pos.z;
    box.position.x = playerX - offset + 0.5;
    box.position.z = playerZ - offset + 0.5;
  });

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 3,
    20,
    box.position,
    scene
  );
  camera.attachControl(canvas, true);
  camera.inputs.clear();
  scene.registerBeforeRender(() => {
    camera.target = box.position;
  });

  const guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  createHPBar(guiTexture);
  createManaBar(guiTexture);

  createInventoryUI(guiTexture, (item) => {
    console.log(`Used item from inventory: ${item.name}`);
  });

  const enemy = new Enemy(scene, new BABYLON.Vector3(0.5, 0.5, 0.5), guiTexture);

  enemy.damage(30);

  new Spell({
    id: "fireball",
    name: "Fire",
    type: "fire",
    damage: 25,
    manaCost: 10,
    offset: "-50px",
    guiTexture,
    scene,
    playerMesh: box,
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
    playerMesh: box,
    direction: getLastDirection,
    cooldown: 1000,
  });

  return scene;
}
