import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

export class Enemy {
  constructor(scene, position, guiTexture) {
    this.hp = 100;
    this.maxHp = 100;

    // Création du mesh (box rouge)
    this.mesh = BABYLON.MeshBuilder.CreateBox("enemyBox", { size: 1 }, scene);
    this.mesh.position = position.clone();

    const mat = new BABYLON.StandardMaterial("enemyMat", scene);
    mat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.mesh.material = mat;

    // Création d'une barre de vie GUI liée au mesh
    this.hpBar = new GUI.Rectangle("hpBar");
    this.hpBar.width = "100px";
    this.hpBar.height = "15px";
    this.hpBar.cornerRadius = 5;
    this.hpBar.background = "black";
    this.hpBar.alpha = 0.6;
    this.hpBar.isPointerBlocker = false;

    // Barre verte représentant la vie restante
    this.hpBarInner = new GUI.Rectangle("hpBarInner");
    this.hpBarInner.background = "green";
    this.hpBarInner.width = "100%";
    this.hpBarInner.height = "100%";
    this.hpBarInner.cornerRadius = 5;
    this.hpBarInner.isPointerBlocker = false;

    this.hpBar.addControl(this.hpBarInner);

    guiTexture.addControl(this.hpBar);

    // Lier la barre au mesh, au-dessus
    this.hpBar.linkWithMesh(this.mesh);
    this.hpBar.linkOffsetY = -50; // décalage vertical

    // Permet d'accéder directement à la position
    this.position = this.mesh.position;
  }

  damage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;

    // Met à jour la taille de la barre de vie
    const hpRatio = this.hp / this.maxHp;
    this.hpBarInner.width = hpRatio * 100 + "%";

    if (this.hp === 0) {
      this.die();
    }
  }

  die() {
    this.mesh.dispose();
    this.hpBar.dispose();
    console.log("Enemy defeated");
  }
}
