import * as BABYLON from "babylonjs";

export function generateGround(scene, mapSize, offset) {
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: mapSize / 2, height: mapSize / 2, subdivisions: 1 },
    scene
  );

  ground.position.x = mapSize / 4 - offset;
  ground.position.z = mapSize / 4 - offset;

  const mat = new BABYLON.StandardMaterial("roofMat ");

  mat.diffuseTexture = new BABYLON.Texture("/textures/ground_mat.jpg", scene);
  ground.material = mat;



  return ground;
}
