import { EnemyManager } from "@/babylon/classes/EnemyManager.js";
import { Enemy } from "@/babylon/classes/Enemy.js";

export function generateEnemies(scene, mapSize, guiTexture) {
  const enemyManager = new EnemyManager(mapSize / 2);

  const enemy1 = new Enemy(scene, mapSize, 0, 10, guiTexture, 100, 100, 10, {
    fire: true,
    ice: false,
    lightning: false,
    earth: true,
  });
  enemyManager.add(enemy1);

  const enemy2 = new Enemy(scene, mapSize, 0, 10, guiTexture, 100, 100, 10, {
    fire: false,
    ice: true,
    lightning: false,
    earth: false,
  });
  enemyManager.add(enemy2);

  const enemy3 = new Enemy(scene, mapSize, 0, 10, guiTexture, 100, 100, 10, {
    fire: false,
    ice: true,
    lightning: false,
    earth: false,
  });
  enemyManager.add(enemy3);

  enemyManager.setpositionalEnemies();

  return enemyManager;
}
