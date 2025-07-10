import * as BABYLON from "babylonjs";
import { updateDirectionFromKey } from "@/babylon/physics/direction.js";

export class Player {
  constructor(scene, mapSize, offset, startX = 1, startZ = 1) {
    this.mapSize = mapSize;
    this.offset = offset;
    this.scene = scene;

    this.x = startX;
    this.z = startZ;

    // Create player mesh
    this.mesh = BABYLON.MeshBuilder.CreateBox("player", { width: 1, height: 1, depth: 1 }, scene);
    this.mesh.position.set(this.x - offset + 0.5, 0.5, this.z - offset + 0.5);

    this._registerInput();
  }

  _registerInput() {
    window.addEventListener("keydown", (e) => {
      const pos = updateDirectionFromKey(e.key,   new BABYLON.Vector3(this.x, 0, this.z), this.mapSize);
      this.x = pos.x;
      this.z = pos.z;
      this.mesh.position.x = this.x - this.offset + 0.5;
      this.mesh.position.z = this.z - this.offset + 0.5;
    });
  }

  getPosition() {
    return { x: this.x, z: this.z };
  }

  getMesh() {
    return this.mesh;
  }
}
