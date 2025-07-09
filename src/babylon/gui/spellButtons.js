import * as GUI from "babylonjs-gui";

export function addSpellButton(guiTexture, name, leftOffset, callback, cooldown = 0) {
  // Container pour bouton + overlay cooldown
  const container = new GUI.StackPanel();
  container.width = "80px";
  container.height = "40px";
  container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  container.left = leftOffset;
  container.top = "-100px";
  container.isVertical = false;
  guiTexture.addControl(container);

  // Bouton principal
  const button = GUI.Button.CreateSimpleButton(name, name);
  button.width = "80px";
  button.height = "40px";
  button.color = "white";
  button.background = "darkblue";
  container.addControl(button);

  // Overlay cooldown (barre sombre semi-transparente)
  const cooldownOverlay = new GUI.Rectangle();
  cooldownOverlay.width = 1; // 100%
  cooldownOverlay.height = 1;
  cooldownOverlay.background = "rgba(0, 0, 0, 0.5)";
  cooldownOverlay.isPointerBlocker = false;
  cooldownOverlay.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  cooldownOverlay.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  container.addControl(cooldownOverlay);

  // Animation pulsante sur la couleur du bouton pendant cooldown
  let pulseAnimationId = null;

  function startPulseAnimation() {
    let pulseDirection = 1;
    let pulseValue = 0.3; // entre 0 et 0.3

    const animatePulse = () => {
      pulseValue += 0.01 * pulseDirection;
      if (pulseValue >= 0.3) pulseDirection = -1;
      if (pulseValue <= 0) pulseDirection = 1;

      const baseColor = new BABYLON.Color3(0, 0, 0.5);
      const pulseColor = new BABYLON.Color3(
        baseColor.r + pulseValue,
        baseColor.g + pulseValue,
        baseColor.b + pulseValue
      );
      button.background = pulseColor.toHexString();

      pulseAnimationId = requestAnimationFrame(animatePulse);
    };
    animatePulse();
  }

  function stopPulseAnimation() {
    if (pulseAnimationId) {
      cancelAnimationFrame(pulseAnimationId);
      pulseAnimationId = null;
    }
    button.background = "darkblue";
  }

  // Fonction pour lancer cooldown visuel (durée en ms)
  function startCooldown(duration) {
    cooldownOverlay.width = 1;
    let start = performance.now();

    startPulseAnimation();
    button.isEnabled = false;
    button.alpha = 0.6;

    const animate = () => {
      let elapsed = performance.now() - start;
      let progress = Math.min(elapsed / duration, 1);
      cooldownOverlay.width = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        cooldownOverlay.width = 0;
        stopPulseAnimation();
        button.isEnabled = true;
        button.alpha = 1;
      }
    };

    animate();
  }

  // Quand on clique sur le bouton
  button.onPointerUpObservable.add(() => {
    callback();
    if (cooldown > 0) {
      startCooldown(cooldown);
    }
  });

  return button;
}
