export const DOM_ELEMENTS = {
    header: document.querySelector("#header"),
    numberOfPlayersRadioButtons: document.querySelectorAll("input[type=radio]"),
    colorPickerButtons: [...document.querySelectorAll(".form__colors-btn")],
    playerNameInput: document.querySelector("#player-name"),
    playersContainer: document.querySelector(".form__players-list"),
    playersFields: document.querySelector(".form__players-list").children,
    startGameBtn: document.querySelector("#start-game")
}