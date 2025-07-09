import * as BABYLON from "babylonjs";
import { addSpellButton } from "@/babylon/gui/spellButtons.js";

export class Spell {
  constructor({
    id,
    name,
    type,
    damage,
    manaCost,
    color,
    offset,
    guiTexture,
    scene,
    playerMesh,
    direction,
    cooldown,
    enemies = [],
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.manaCost = manaCost;
    this.color = color || this.getSpellColor(this.type);
    this.offset = offset || "0px";
    this.scene = scene;
    this.guiTexture = guiTexture;
    this.playerMesh = playerMesh;
    this.direction = direction;
    this.cooldown = cooldown;
    this.enemies = enemies;

    this.createUI();
  }

  getSpellColor(type) {
    switch (type) {
      case "fire": // Rouge orangé
        return new BABYLON.Color3(1, 0.3, 0);
      case "ice": // Bleu clair
        return new BABYLON.Color3(0.3, 0.7, 1);
      case "lightning": // Jaune
        return new BABYLON.Color3(1, 1, 0.2);
      case "earth": // Marron / Vert kaki
        return new BABYLON.Color3(0.5, 0.35, 0.1);
      default: // Bleu par défaut
        return new BABYLON.Color3(0.3, 0.3, 1);
    }
  }

  createUI() {
    addSpellButton(
      this.guiTexture,
      this.name,
      this.offset,
      () => {
        this.cast();
      },
      this.cooldown
    );
  }

  cast() {
    const dir = this.direction().clone().normalize();
    const projectile = BABYLON.MeshBuilder.CreateBox(
      `${this.id}_projectile`,
      { size: 0.3 },
      this.scene
    );

    const mat = new BABYLON.StandardMaterial(`${this.id}_mat`, this.scene);
    mat.emissiveColor = this.color;
    projectile.material = mat;

    const distance = 1.2;
    const startPosition = this.playerMesh.position.add(dir.scale(distance));
    startPosition.y = 0.5;
    projectile.position = startPosition;

    const speed = 0.2;
    const lifetime = 3000;

    // Fonction qui déplace le projectile et vérifie collisions
    const update = () => {
      projectile.position.addInPlace(dir.scale(speed));

      // Vérifie collision avec chaque ennemi
      for (const enemy of this.enemies) {
        if (this._checkCollision(projectile, enemy.mesh)) {
          enemy.damage(this.damage);
          projectile.dispose();
          this.scene.onBeforeRenderObservable.remove(observer);
          break;
        }
      }
    };

    const observer = this.scene.onBeforeRenderObservable.add(update);

    // Suppression du projectile après un certain temps
    setTimeout(() => {
      if (!projectile.isDisposed()) {
        projectile.dispose();
      }
      this.scene.onBeforeRenderObservable.remove(observer);
    }, lifetime);
  }

  _checkCollision(mesh1, mesh2) {
    // Utilisation des bounding spheres pour une détection simple
    const bs1 = mesh1.getBoundingInfo().boundingSphere;
    const bs2 = mesh2.getBoundingInfo().boundingSphere;
    const dist = BABYLON.Vector3.Distance(bs1.centerWorld, bs2.centerWorld);
    return dist < bs1.radiusWorld + bs2.radiusWorld;
  }
}
