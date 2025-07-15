import * as BABYLON from "babylonjs";
import playerClasses from '@/data/playerClasses.json';
import { Spell } from './Spell';
import { SpellManager } from './SpellManager';

export class Player {
  constructor(scene, offset, startX = 1, startZ = 1, enemyManager, guiTexture, playerManager) {
    this.x = startX;
    this.z = startZ;

    this.enemyManager = enemyManager;
    this.guiTexture = guiTexture;
    this.selectedSpellIndex = 0;
    this.spellManager = new SpellManager(this, this.guiTexture);
    this.playerManager = playerManager;

    // Create player mesh
    this.mesh = BABYLON.MeshBuilder.CreateBox("player1", { width: 1, height: 1, depth: 1 }, scene);
    this.mesh.position.set(this.x - offset + 0.5, 0.5, this.z - offset + 0.5);

    this.playerClass = null;
    this.scene = scene;
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

  setPlayerClass(className) {
    const classData = playerClasses.find(c => c.name === className);
    if (classData) {
      this.playerClass = classData;
      this.HP = classData.HP;
      this.MP = classData.MP;
      this.physical_attack = classData.physical_attack;
      this.physical_defense = classData.physical_defense;
      this.magical_attack = classData.magical_attack;
      this.magical_defense = classData.magical_defense;
      this.speed = classData.speed;
      this.skills = classData.skills;

      // Clear existing spells and add new spells from the class
      this.spellManager.removeAllSpells();
      const spells = [];
      classData.skills.forEach(skill => {
        const spell = new Spell({
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
          playerManager: this.playerManager
        });
        spells.push(spell);
      });
      this.spellManager.setSpells(spells);
    } else {
      console.error(`Player class "${className}" not found.`);
    }
  }
}