import * as BABYLON from "babylonjs";

export class Player {
  constructor(scene, offset, startX = 1, startZ = 1, spells = []) {

    this.x = startX;
    this.z = startZ;

    this.spells = spells;
    this.selectedSpellIndex = 0; // Default selected spell

    // Create player mesh
    this.mesh = BABYLON.MeshBuilder.CreateBox("player", { width: 1, height: 1, depth: 1 }, scene);
    this.mesh.position.set(this.x - offset + 0.5, 0.5, this.z - offset + 0.5);
  }

  getMesh() {
    return this.mesh;
  }

  getAttack() {
    if (this.spells.length === 0) {
      return 10; // Default attack value if no spells
    }
    return this.spells[this.selectedSpellIndex].damage;
  }

  addSpell(spell) {
    this.spells.push(spell);
  }
}