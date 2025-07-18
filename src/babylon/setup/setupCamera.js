import * as BABYLON from "babylonjs";

export function setupCamera(scene, canvas, targetMesh) {
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 3,
    20,
    targetMesh.position,
    scene
  );
  camera.attachControl(canvas, true);
  camera.detachControl()

  scene.registerBeforeRender(() => {
    camera.target = targetMesh.position;
  });
}
