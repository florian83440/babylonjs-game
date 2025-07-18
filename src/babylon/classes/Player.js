import * as BABYLON from "babylonjs";
import playerClasses from "@/data/playerClasses.json";
import { Spell } from "./Spell";
import { SpellManager } from "./SpellManager";
import store from "@/store";
import { setSpellsGUI } from "@/babylon/gui/spellButtons.js";

export class Player {
  constructor(scene, offset, startX = 1, startZ = 1, enemyManager, guiTexture, playerManager) {
    this.x = startX;
    this.z = startZ;

    this.enemyManager = enemyManager;
    this.guiTexture = guiTexture;
    this.selectedSpellIndex = 0;
    this.spellManager = new SpellManager(this, this.guiTexture);
    this.playerManager = playerManager;

    // Create Player mesh
    this.mesh = BABYLON.MeshBuilder.CreateBox("player1", { width: 1, height: 1, depth: 1 }, scene);
    this.mesh.position.set(this.x - offset + 0.5, 0.5, this.z - offset + 0.5);

    this.playerClass = null;
    this.scene = scene;
  }

  // Override onManaChange to call updateMana
  onManaChange() {
    if (this.playerClass) {
      store.dispatch("playerStore/updateMP", this.playerClass.MP);
    }
  }

  getMesh() {
    return this.mesh;
  }

  getAttack() {
    if (this.spellManager.spells.length === 0) {
      return 10; // Default attack value if no spells
    }
    return this.spellManager.spells[this.selectedSpellIndex].damage;
  }

  removeMana(manaCost) {
    if (this.playerClass && this.playerClass.MP >= manaCost) {
      this.playerClass.MP -= manaCost;
      this.onManaChange(); // Call onManaChange after modifying MP
      return true; // Mana successfully removed
    }
    return false; // Not enough mana
  }

  setPlayerClass(className) {
    const classData = playerClasses.find((c) => c.name === className);
    if (classData) {
      this.playerClass = classData;

      store.dispatch("playerStore/initializePlayerClassData", {
        HP: classData.HP,
        MP: classData.MP,
      });
      store.dispatch("playerStore/updatePlayerClass", classData);
      store.dispatch("playerStore/updatePhysicalAttack", classData.physical_attack);
      store.dispatch("playerStore/updatePhysicalDefense", classData.physical_defense);
      store.dispatch("playerStore/updateMagicalAttack", classData.magical_attack);
      store.dispatch("playerStore/updateMagicalDefense", classData.magical_defense);
      store.dispatch("playerStore/updateSpeed", classData.speed);
      store.dispatch("playerStore/updateSkills", classData.skills);

      this.maxHP = classData.HP;
      this.maxMP = classData.MP;
      this.physical_attack = classData.physical_attack;
      this.physical_defense = classData.physical_defense;
      this.magical_attack = classData.magical_attack;
      this.magical_defense = classData.magical_defense;
      this.speed = classData.speed;
      this.skills = classData.skills;

      // Clear existing spells and add new ones
      this.spellManager.removeAllSpells();
      const spells = classData.skills.map(
        (skill) =>
          new Spell({
            id: skill.id,
            name: skill.name,
            type: skill.type,
            damage: skill.damage,
            manaCost: skill.manaCost,
            guiTexture: this.guiTexture,
            scene: this.scene,
            playerMesh: this.mesh,
            cooldown: 2,
            enemyManager: this.enemyManager,
            attacker: this,
            allyCast: skill.allyCast || false,
            onlySelfCast: skill.onlySelfCast || false,
            playerManager: this.playerManager,
          })
      );
      this.spellManager.setSpells(spells);
      setSpellsGUI(this.guiTexture, this.spellManager);
      this.onManaChange();
    } else {
      console.error(`playerStore class "${className}" not found.`);
    }
  }

  changeHP(amount) {
    if (this.playerClass) {
      this.playerClass.HP += amount;
      if (this.playerClass.HP > this.maxHP) {
        this.playerClass.HP = this.maxHP;
      } else if (this.playerClass.HP < 0) {
        this.playerClass.HP = 0;
      }
      store.dispatch("playerStore/updateHP", this.playerClass.HP);
    }
  }

  get HP() {
    return store.getters["playerStore/HP"];
  }

  set HP(value) {
    store.dispatch("playerStore/updateHP", value);
  }

  get MP() {
    return store.getters["playerStore/MP"];
  }

  set MP(value) {
    store.dispatch("playerStore/updateMP", value);
  }

  get maxHP() {
    return store.getters["playerStore/maxHP"];
  }

  set maxHP(value) {
    store.dispatch("playerStore/updateMaxHP", value);
  }

  get maxMP() {
    return store.getters["playerStore/maxMP"];
  }

  set maxMP(value) {
    store.dispatch("playerStore/updateMaxMP", value);
  }
}
