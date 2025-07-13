import * as BABYLON from "babylonjs";
import { Player } from "@/babylon/classes/Player.js";
import { Spell } from "@/babylon/classes/Spell.js";

export function generatePlayers(scene, mapSize, offset, guiTexture, enemyManager) {
  const player = new Player(scene, offset, mapSize / 4, 1);
  const playerMesh = player.getMesh();
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
    attacker: player,
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
    attacker: player,
  });

  player.addSpell(fireballSpell);
  player.addSpell(iceballSpell);
  return [player];
}
