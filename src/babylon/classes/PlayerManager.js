export class PlayerManager {
  constructor() {
    this.players = {};
  }

  addPlayer(player, id) {
    this.players[id] = player;
  }

  removePlayer(id) {
    delete this.players[id];
  }

  getPlayer(id) {
    return this.players[id];
  }

  getAllPlayers() {
    return Object.values(this.players);
  }
}
