import {DOM_ELEMENTS} from "../base";
import state from "../state";
import {clearInput} from "../utils/functions";

import Player from "../models/Player";

import * as formView from "../views/form";
import * as playerView from "../views/player";

import * as notificationController from "./notification";
import * as notificationView from "../views/notification";

import * as boardController from "./board";

const {playersFields, playerNameInput, colorPickerButtons} = DOM_ELEMENTS;

export function changeAmountOfPlayers(value) {
    state.numberOfPlayers = +value;
}

function generatePlayersDOM() {
    const spreadPlayersFields = [...playersFields];
    for(let i = 0; i < spreadPlayersFields.length; i++) {
        spreadPlayersFields[i].remove();

        if(state.players[i] !== undefined) {
            const {name, color} = state.players[i];
            playerView.addPlayerField(i, name, color);
        }
    }
}

function disablePickedButton() {
    const chosenColor = colorPickerButtons.filter(col => col.dataset.color === state.pickedColor.dataset.color)[0];

    chosenColor.classList.add("disabled");
    chosenColor.classList.remove("selected");
    chosenColor.disabled = true;
}

export function setColor(color, e) {
    e.preventDefault();
    state.pickedColor = color;
    colorPickerButtons.forEach(color => color.classList.remove("selected"));
    color.classList.add("selected");
}

export function updateFormBodyDOM(value) {
    const playersColors = [];

    state.players = state.players.slice(0, +value);
    state.players.forEach(p => playersColors.push(p.color));
    generatePlayersDOM();

    colorPickerButtons.filter(bc => !playersColors.includes(bc.dataset.color)).forEach(fbc => {
        if(fbc.disabled) {
            fbc.disabled = false;
            fbc.classList.remove("disabled");
        }
    })

    formView.changeTextButton();
}

export function deletePlayer(e) {
    e.preventDefault();
    const name = e.target.closest(".player").dataset.name;
    const success = notificationController.successHandler("playerRemoved");

    e.target.closest(".player").remove();
    
    Player.removePlayer(name);

    updateFormBodyDOM([...playersFields].length);

    notificationView.displayNotification(success, "success");
    formView.changeTextButton();
}

export function submitForm(e) {
    e.preventDefault();
    const extractedPlayersNames = state.players.map(p => p.name);
    const playerExistance = !extractedPlayersNames.includes(playerNameInput.value);
    const player = {
        name: playerNameInput.value,
        color: state.pickedColor === "" ? undefined : state.pickedColor.dataset.color,
        existance: playerExistance
    }
    const error = notificationController.errorHandler(player);
    const success = notificationController.successHandler("playerAdded");

    if(state.players.length === state.numberOfPlayers) {
        DOM_ELEMENTS.header.remove();
        boardController.createBoard();    
    } else {   
        if(error.flag) {
            notificationView.displayNotification(error.msg, "error");
        } else {
            playerView.addPlayerField(state.players.length, playerNameInput.value, state.pickedColor.dataset.color);

            disablePickedButton();

            Player.addPlayer(player);

            notificationView.displayNotification(success, "success");

            clearInput(playerNameInput);

            state.pickedColor = "";
            formView.changeTextButton();
        }
    }
}

//TODO & REFACTORING
//5. stworzyć plik z klasami, które dodaje dynamicznie poprzez js w tym pliku!
//6. drobne poprawki wizualne (np placeholder przechodzi nad input)"
//8. Gdy osiągnie się zadeklarowaną liczbę graczy -> zablokować input (dodawanie gracza);
//9. Dodać możliwość edycji nazwy gracza ??

//BUGI
// 1. Height "player__color" nie jest w rzeczywistości 100%;