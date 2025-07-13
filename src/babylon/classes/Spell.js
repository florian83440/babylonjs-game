import * as BABYLON from "babylonjs";
import { addSpellButton } from "@/babylon/gui/spellButtons.js";
import { DamageCalculator } from "./DamageCalculator";

export class Spell {
  constructor({
    id,
    name,
    type,
    damage,
    manaCost,
    color,
    offset,
    guiTexture,
    scene,
    playerMesh,
    cooldown,
    enemyManager,
    attacker,
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.manaCost = manaCost;
    this.color = color || this.getSpellColor(this.type);
    this.offset = offset || "0px";
    this.scene = scene;
    this.guiTexture = guiTexture;
    this.playerMesh = playerMesh;
    this.cooldown = cooldown;
    this.enemyManager = enemyManager;
    this.targetEnemy = null;
    this.attacker = attacker;
    this.damageCalculator = new DamageCalculator();

    this.createUI();
  }

  getSpellColor(type) {
    switch (type) {
      case "fire": // Rouge orangé
        return new BABYLON.Color3(1, 0.3, 0);
      case "ice": // Bleu clair
        return new BABYLON.Color3(0.3, 0.7, 1);
      case "lightning": // Jaune
        return new BABYLON.Color3(1, 1, 0.2);
      case "earth": // Marron / Vert kaki
        return new BABYLON.Color3(0.5, 0.35, 0.1);
      default: // Bleu par défaut
        return new BABYLON.Color3(0.3, 0.3, 1);
    }
  }

  createUI() {
    addSpellButton(
      this.guiTexture,
      this.name,
      this.offset,
      () => {
        this.selectTarget();
      },
      this.cooldown
    );
  }

  selectTarget() {
    if (this.enemyManager && this.enemyManager.enemies.length > 0) {
      this.enemyManager.enemies.forEach((enemy) => {
        enemy.mesh.actionManager = new BABYLON.ActionManager(this.scene);

        enemy.mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
            this.targetEnemy = enemy;
            this.cast();
          })
        );
      });
      console.log("Select a target for " + this.name);
    } else {
      console.log("No enemies available.");
    }
  }

  cast() {
    if (this.targetEnemy) {
      console.log("Casting " + this.name + " on " + this.targetEnemy.mesh.name);
      const damage = this.damageCalculator.calculateDamage(this.attacker, this.targetEnemy, this);
      this.targetEnemy.damage(damage);
      this.removeTargetSelection();
    } else {
      console.log("No target selected for " + this.name);
    }
  }

  removeTargetSelection() {
    if (this.enemyManager && this.enemyManager.enemies.length > 0) {
      this.enemyManager.enemies.forEach((enemy) => {
        enemy.mesh.actionManager = null;
      });
    }
  }
}
