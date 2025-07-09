import * as GUI from 'babylonjs-gui'

let manaBar

export function createManaBar(guiTexture) {
    const manaBg = new GUI.Rectangle()
    manaBg.width = "200px"
    manaBg.height = "20px"
    manaBg.cornerRadius = 10
    manaBg.color = "white"
    manaBg.thickness = 2
    manaBg.background = "grey"
    manaBg.top = "-15px"
    manaBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    manaBg.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

    manaBar = new GUI.Rectangle()
    manaBar.width = "100%"
    manaBar.height = "100%"
    manaBar.cornerRadius = 10
    manaBar.color = "transparent"
    manaBar.thickness = 0
    manaBar.background = "#3399ff"

    manaBg.addControl(manaBar)
    guiTexture.addControl(manaBg)
}

export function updateMana(percent) {
    if (manaBar) manaBar.width = `${percent}%`
}
