import "./scss/index.scss";
import "../public/images/background.jpg";
import {DOM_ELEMENTS as dom_el} from "./js/base";

import * as formController from "./js/controllers/form";

import * as formView from "./js/views/form";
import * as notificationView from "./js/views/notification";


document.addEventListener("DOMContentLoaded", () => {
    notificationView.createNotification();
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