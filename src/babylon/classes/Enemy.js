import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";

export class Enemy {
  constructor(scene, position, guiTexture, maxHp, currentHp, movementPattern) {
    this.scene = scene;
    this.hp = currentHp;
    this.maxHp = maxHp;

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

    this.movementPattern = movementPattern;
    this.currentStep = 0;
    this.isMoving = false;
  }

  _moveNextStep() {
    if (!this.isMoving || !this.movementPattern || this.movementPattern.length === 0) return;

    const step = this.movementPattern[this.currentStep];
    const moveAmount = step.distance ?? 1;

    const startPosition = this.mesh.position.clone();
    const endPosition = startPosition.clone();

    switch (step.direction) {
      case "left":
        endPosition.x -= moveAmount;
        break;
      case "right":
        endPosition.x += moveAmount;
        break;
      case "top":
        endPosition.z -= moveAmount;
        break;
      case "bottom":
        endPosition.z += moveAmount;
        break;
      default:
        console.warn(`Unknown direction: ${step.direction}`);
        break;
    }

    // Create the animation
    const animation = new BABYLON.Animation(
      "moveAnim",
      "position",
      60, // FPS
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const keys = [
      { frame: 0, value: startPosition },
      { frame: 60, value: endPosition },
    ];

    animation.setKeys(keys);

    // Optional easing for smooth effect
    const easing = new BABYLON.CubicEase();
    easing.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    animation.setEasingFunction(easing);

    this.mesh.animations = [];
    this.mesh.animations.push(animation);

    this.scene.beginAnimation(this.mesh, 0, 60, false, 1, () => {
      // After animation, go to next step
      this.currentStep = (this.currentStep + 1) % this.movementPattern.length;
      this._movementTimeout = setTimeout(() => {
        this._moveNextStep();
      }, 0); // immediate next move
    });
  }

  startPattern() {
    if (this.isMoving) return;
    this.isMoving = true;
    this._moveNextStep();
  }

  stopPattern() {
    this.isMoving = false;
    if (this._movementTimeout) {
      clearTimeout(this._movementTimeout);
      this._movementTimeout = null;
    }
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
