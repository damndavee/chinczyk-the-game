import "./scss/index.scss";
import "../public/images/background.jpg";
import {DOM_ELEMENTS as dom_el} from "./js/base";

import Board from "./js/model/Board";
import Form from "./js/model/Form";

import * as formView from "./js/views/form";
import * as notificationView from "./js/views/notification";

const board = new Board();
const form = new Form();

document.addEventListener("DOMContentLoaded", () => {
    notificationView.createNotification();
    board.createBoard();
})

dom_el.startGameBtn.addEventListener("click", e => {
    form.submitForm(e);
})

dom_el.playerNameInput.addEventListener("keydown", e => {
    if(e.keyCode === 13) {
        form.submitForm(e);
    }
})

dom_el.numberOfPlayersRadioButtons.forEach(radio => {
    radio.addEventListener("change", () => {
        form.changeAmountOfPlayers(radio.value);
    })
});

dom_el.colorPickerButtons.forEach(color => {
    color.addEventListener("click", (e) => {
        form.setColor(color, e);
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
        e.preventDefault();
        form.deletePlayer(e);
    }
})
