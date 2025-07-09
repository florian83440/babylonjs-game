// inventory.js
import * as GUI from 'babylonjs-gui';
import playerData from '/src/data/player.json'

export function createInventoryUI(guiTexture, onItemUse) {
    // Create inventory panel container
    const inventoryPanel = new GUI.StackPanel();
    inventoryPanel.width = "220px";
    inventoryPanel.height = "300px";
    inventoryPanel.background = "rgba(0,0,0,0.5)";
    inventoryPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    inventoryPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    inventoryPanel.paddingBottom = "20px";
    inventoryPanel.paddingRight = "20px";
    guiTexture.addControl(inventoryPanel);

    // Title text block
    const inventoryTitle = new GUI.TextBlock();
    inventoryTitle.text = "Inventory";
    inventoryTitle.height = "30px";
    inventoryTitle.color = "white";
    inventoryTitle.fontSize = 20;
    inventoryTitle.paddingBottom = "10px";
    inventoryPanel.addControl(inventoryTitle);

    // Helper to create item buttons
    function createInventoryButton(item) {
        const button = GUI.Button.CreateSimpleButton(`item_${item.id}`, item.name);
        button.width = "180px";
        button.height = "40px";
        button.color = "white";
        button.background = "darkslateblue";
        button.cornerRadius = 10;
        button.paddingTop = "5px";
        button.paddingBottom = "5px";
        button.onPointerUpObservable.add(() => {
            if (typeof onItemUse === "function") {
                onItemUse(item);
            }
        });
        return button;
    }

    playerData.player.inventory.items.forEach((item, i) => {
        inventoryPanel.addControl(createInventoryButton(item));
    });

    return inventoryPanel; // optional, if you want to manipulate it later
}
