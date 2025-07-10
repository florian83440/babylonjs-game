import * as BABYLON from "babylonjs";

export class EnemyManager {
  constructor() {
    this.enemies = [];
    this.onEnemyAdded = new BABYLON.Observable();
    this.onEnemyRemoved = new BABYLON.Observable();
  }

  add(enemy) {
    this.enemies.push(enemy);
    this.onEnemyAdded.notifyObservers(enemy);
  }

  remove(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index !== -1) {
      this.enemies.splice(index, 1);
      this.onEnemyRemoved.notifyObservers(enemy);
    }
  }

  getAll() {
    return this.enemies;
  }
}
