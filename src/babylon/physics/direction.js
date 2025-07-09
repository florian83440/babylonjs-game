// direction.js

import * as BABYLON from "babylonjs";

let lastDirection = new BABYLON.Vector3(0, 0, 1); // default direction: forward

export function getLastDirection() {
  return lastDirection.clone();
}

export function updateDirectionFromKey(key, playerPos, mapSize) {
  switch (key.toLowerCase()) {
    case "z":
      if (playerPos.z < mapSize / 2 - 1) {
        playerPos.z++;
        lastDirection.set(0, 0, 1);
      }
      break;
    case "s":
      if (playerPos.z > 0) {
        playerPos.z--;
        lastDirection.set(0, 0, -1);
      }
      break;
    case "q":
      if (playerPos.x > 0) {
        playerPos.x--;
        lastDirection.set(-1, 0, 0);
      }
      break;
    case "d":
      if (playerPos.x < mapSize / 2 - 1) {
        playerPos.x++;
        lastDirection.set(1, 0, 0);
      }
      break;
  }

  return playerPos;
}
