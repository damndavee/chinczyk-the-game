import "./scss/index.scss";
import "../public/images/background.jpg";
import {DOM_ELEMENTS as dom_el} from "./js/utils/base";

import * as formController from "./js/controllers/form";

import * as formView from "./js/views/form";
import * as notificationView from "./js/views/notification";


// TESTING
import * as boardController from "./js/controllers/board";
import state from "./js/utils/state";
import * as gameController from "./js/controllers/game";
import * as scoreboardView from "./js/views/scoreboard";
const btn = document.querySelector(".roll");

// btn.addEventListener('click', () => {
//     gameController.displayDice();
// })
// TESTING

document.addEventListener("DOMContentLoaded", () => {
    // console.log(state)
    notificationView.createNotification();
    // dom_el.header.remove();
    // boardController.createBoard();
    // gameController.startGame();
    // scoreboardView.createScoreboard();
})

dom_el.startGameBtn.addEventListener("click", e => {
    formController.submitForm(e);
})

dom_el.playerNameInput.addEventListener("keydown", e => {
    if(e.keyCode === 13) {
        formController.submitForm(e);
    }
})

dom_el.numberOfPlayersRadioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
        formController.changeAmountOfPlayers(radio.value);
        formController.updateFormBodyDOM(radio.value);
    })
});

dom_el.colorPickerButtons.forEach(color => {
    color.addEventListener("click", (e) => {
        formController.setColor(color, e);
    })

    color.addEventListener("mouseover", () => {
        formView.changeHoverColor("enter", color);
    })

    color.addEventListener("mouseout", () => {
        formView.changeHoverColor("out", color);
    })
})

dom_el.playersContainer.addEventListener("click", e => {
    if(e.target.className === "player__remove-btn") {
        formController.deletePlayer(e);
    }
})

dom_el.gameContainer.addEventListener("click", e => {
    if(e.target.classList.contains("pawn")) {
        gameController.movePawn(e);
    }

    if(e.target.id === "dice-btn") {
        gameController.rollDice();
    }
})