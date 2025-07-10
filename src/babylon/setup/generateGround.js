import * as BABYLON from "babylonjs";

export function generateGround(scene, mapSize, offset) {
  const size = 1;
  for (let x = 0; x < mapSize / 2; x++) {
    for (let z = 0; z < mapSize / 2; z++) {
      const tile = BABYLON.MeshBuilder.CreateGround(
        `tile_${x}_${z}`,
        { width: size, height: size },
        scene
      );
      tile.position.x = x - offset + 0.5;
      tile.position.z = z - offset + 0.5;

      const mat = new BABYLON.StandardMaterial(`mat_${x}_${z}`, scene);
      mat.diffuseColor = new BABYLON.Color3(0.1, 0.65, 0.1);
      tile.material = mat;

      const lines = BABYLON.MeshBuilder.CreateLines(
        `border_${x}_${z}`,
        {
          points: [
            new BABYLON.Vector3(tile.position.x - 0.5, 0.01, tile.position.z - 0.5),
            new BABYLON.Vector3(tile.position.x + 0.5, 0.01, tile.position.z - 0.5),
            new BABYLON.Vector3(tile.position.x + 0.5, 0.01, tile.position.z + 0.5),
          ],
        },
        scene
      );

      const lineMaterial = new BABYLON.StandardMaterial(`lineMat_${x}_${z}`, scene);
      lineMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      lineMaterial.alpha = 0.05;
      lines.material = lineMaterial;
    }
  }
}
