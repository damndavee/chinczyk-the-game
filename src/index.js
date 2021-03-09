import "./scss/index.scss";
import "../public/images/background.jpg";
import Board from "./js/model/Board";
import Form from "./js/model/Form";

// import {changeHoverColor} from "./js/views/form";

import {DOM_ELEMENTS as dom_el} from "./js/base";

const board = new Board();
const form = new Form();

import * as formController from "./js/controller/form";

formController.test1();
formController.test2();

document.addEventListener("DOMContentLoaded", () => {
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
        form.changeHoverColor("enter", color);
    })

    color.addEventListener("mouseout", () => {
        form.changeHoverColor("out", color);
    })
})