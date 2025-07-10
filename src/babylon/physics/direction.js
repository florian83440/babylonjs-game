import * as BABYLON from "babylonjs";

let lastDirection = new BABYLON.Vector3(0, 0, 1); // Par défaut : avant

export function getLastDirection() {
  return lastDirection.clone();
}

/**
 * Met à jour la direction et la position du joueur selon la touche pressée.
 * @param {string} key - Touche directionnelle ('z', 'q', 's', 'd')
 * @param {BABYLON.Vector3} playerPos - Position actuelle du joueur (modifiée directement)
 * @param {number} mapSize - Taille de la map
 * @returns {BABYLON.Vector3} - Nouvelle position du joueur
 */
export function updateDirectionFromKey(key, playerPos, mapSize) {
  const halfMap = mapSize / 2;

  switch (key.toLowerCase()) {
    case "z": // Haut
      if (playerPos.z < halfMap - 1) {
        playerPos.z++;
        lastDirection.set(0, 0, 1);
      }
      break;

    case "s": // Bas
      if (playerPos.z > 0) {
        playerPos.z--;
        lastDirection.set(0, 0, -1);
      }
      break;

    case "q": // Gauche
      if (playerPos.x > 0) {
        playerPos.x--;
        lastDirection.set(-1, 0, 0);
      }
      break;

    case "d": // Droite
      if (playerPos.x < halfMap - 1) {
        playerPos.x++;
        lastDirection.set(1, 0, 0);
      }
      break;
  }

  return playerPos;
}
