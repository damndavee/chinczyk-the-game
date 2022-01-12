export const DOM_ELEMENTS = {
    header: document.querySelector("#header"),
    numberOfPlayersRadioButtons: document.querySelectorAll("input[type=radio]"),
    colorPickerButtons: [...document.querySelectorAll(".form__colors-btn")],
    playerNameInput: document.querySelector("#player-name"),
    playersContainer: document.querySelector(".form__players-list"),
    playersFields: document.querySelector(".form__players-list").children,
    startGameBtn: document.querySelector("#start-game"),
    gameContainer: document.querySelector("#game"),
    gameBoard: document.querySelector("#game-board"),
    gameActions: document.querySelector("#game-actions"),
    gameControls: document.querySelector("#controls"),
    gamePlayerInfo: document.querySelector("#scoreboard")
}

const getBoardFields = () => {
    return {
        baseFields: [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("home")),
        startFields: [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("start")),
        regularFields: [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("regular")),
        playableFields: [...document.querySelectorAll("[data-playable]")],
        metaFields: [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("meta")),
        rollBtn: document.querySelector("#dice-btn"),
    }
}

export const getFilteredBoardFields = fieldsTofind => getBoardFields()[fieldsTofind];