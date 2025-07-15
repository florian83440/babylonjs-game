import { Player } from "@/babylon/classes/Player.js";
import { PlayerManager } from "@/babylon/classes/PlayerManager.js";

export function generatePlayers(scene, mapSize, offset, guiTexture, enemyManager) {
  const playerManager = new PlayerManager();

  const player1 = new Player(
    scene,
    offset,
    mapSize / 4,
    1,
    enemyManager,
    guiTexture,
    playerManager
  );
  player1.setPlayerClass("Warden");

  playerManager.addPlayer(player1, player1.getMesh().id);

  return playerManager;
}
