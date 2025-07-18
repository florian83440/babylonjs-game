import * as BABYLON from "babylonjs";
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
    attacker,
    allyCast,
    onlySelfCast,
    itemBuff,
    enemyManager,
    playerManager,
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
    this.playerManager = playerManager;
    this.targetEnemy = null;
    this.attacker = attacker;
    this.allyCast = allyCast;
    this.onlySelfCast = onlySelfCast;
    this.itemBuff = itemBuff || {}; // Store the item buff
    this.damageCalculator = new DamageCalculator();
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

  selectTarget() {
    if (this.onlySelfCast) {
      // Logic for self-cast
      this.selectAlly(true);
    } else if (this.allyCast) {
      // Logic for selecting an ally
      this.selectAlly();
    } else if (this.enemyManager && this.enemyManager.enemies.length > 0) {
      this.enemyManager.enemies.forEach((enemy) => {
        enemy.mesh.actionManager = new BABYLON.ActionManager(this.scene);

        enemy.mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
            this.targetEnemy = enemy;
            this.cast(this.targetEnemy);
          })
        );
      });
      console.log("Select a target for " + this.name);
    } else {
      console.log("No enemies available.");
    }
  }

  selectAlly(selfCast = false) {
    const allies = selfCast
      ? [this.playerManager.getPlayer(this.playerMesh.name)]
      : this.playerManager.getAllPlayers();
    if (!allies || allies.length === 0) {
      console.log(selfCast ? "Self not available." : "No allies available.");
      return;
    }
    if (allies.length === 1 && selfCast) {
      this.cast(allies[0]);
      return;
    } else {
      allies.forEach((ally) => {
        if (ally) {
          ally.mesh.actionManager = new BABYLON.ActionManager(this.scene);
          ally.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
              this.cast(ally);
            })
          );
        }
      });
    }
    console.log("Select a target for " + this.name);
  }

  cast(target) {
    if (target) {
      console.log("Casting " + this.name + " on " + target.mesh.name);

      if ((this.allyCast || this.onlySelfCast) && this.itemBuff) {
        // Apply buffs to the target
        Object.keys(this.itemBuff).forEach((key) => {
          if (key === "heal") {
            // Assuming target has a heal method
            target.heal(this.itemBuff[key]);
          } else {
            // Assuming target has a method to increase stats
            target[key] += this.itemBuff[key];
          }
        });
      } else {
        const damage = this.damageCalculator.calculateDamage(this.attacker, target, this);
        target.damage(damage);
      }
      this.removeMana();
      this.removeTargetSelection();
    } else {
      console.log("No target selected for " + this.name);
    }
  }

  heal(itemBuffElement) {
    if (this.attacker && this.attacker.heal) {
      this.attacker.heal(itemBuffElement);
      this.removeMana();
      console.log(`Healed ${this.attacker.mesh.name} for ${itemBuffElement}`);
    } else {
      console.error("Attacker does not have a heal method.");
    }
  }

  removeTargetSelection() {
    if (this.enemyManager && this.enemyManager.enemies.length > 0) {
      this.enemyManager.enemies.forEach((enemy) => {
        enemy.mesh.actionManager = null;
      });
    }
    const ally = this.scene.player;
    if (ally && ally.mesh.actionManager) {
      ally.mesh.actionManager = null;
    }
  }

  //method to remove mana from player
  removeMana() {
    this.attacker.removeMana(10);
  }
}
