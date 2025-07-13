import * as BABYLON from "babylonjs";

export class EnemyManager {
  constructor(mapSize) {
    this.enemies = [];
    this.onEnemyAdded = new BABYLON.Observable();
    this.onEnemyRemoved = new BABYLON.Observable();
    this.mapSize = mapSize || 10;
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

  //setpositionalEnemies according to center with mqpsize and the number of enemies
  setpositionalEnemies() {
    const enemyPair = Math.ceil(this.enemies.length / 2);
    const offsetX = -4.5; // Offset from the left
    const centerX = this.mapSize/this.enemies.length;
    const spacing = centerX;

    this.enemies.forEach((enemy, index) => {
      let offsetPair =0;
      if (enemyPair){
        offsetPair = -spacing/2;
      }else{
        offsetPair = 0
      }
      enemy.mesh.position.x = centerX+offsetX + spacing*index +offsetPair; // Adjust for center
    });
  }
}
