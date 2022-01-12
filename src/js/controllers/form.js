import {DOM_ELEMENTS} from "../utils/base";
import state from "../utils/state";
import {clearInput} from "../utils/functions";
import {CLASSES} from "../utils/classes";

import Player from "../models/Player";

import * as formView from "../views/form";
import * as playerView from "../views/player";
import * as notificationView from "../views/notification";

import * as notificationController from "../controllers/notification";
import * as gameController from "../controllers/game";
import * as validationController from "../controllers/validation";


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

    chosenColor.classList.add(CLASSES.DISABLED);
    chosenColor.classList.remove(CLASSES.SELECTED);
    chosenColor.disabled = true;
}

export function setColor(color, e) {
    e.preventDefault();
    state.pickedColor = color;
    colorPickerButtons.forEach(color => color.classList.remove(CLASSES.SELECTED));
    color.classList.add(CLASSES.SELECTED);
}

export function updateFormBodyDOM(value) {
    const playersColors = [];

    state.players = state.players.slice(0, +value);
    state.players.forEach(p => playersColors.push(p.color));
    generatePlayersDOM();

    colorPickerButtons.filter(bc => !playersColors.includes(bc.dataset.color)).forEach(fbc => {
        if(fbc.disabled) {
            fbc.disabled = false;
            fbc.classList.remove(CLASSES.DISABLED);
        }
    })

    formView.changeTextButton();
}

export function deletePlayer(e) {
    e.preventDefault();
    const name = e.target.closest(".player").dataset.name;

    e.target.closest(".player").remove();
    
    Player.removePlayer(name);

    updateFormBodyDOM([...playersFields].length);

    notificationController.showNotifcationHandler("playerRemoved");
    formView.changeTextButton();
}

export function submitForm(e) {
    e.preventDefault();
    const extractedPlayersNames = state.players.map(p => p.name);
    const playerExistance = !extractedPlayersNames.includes(playerNameInput.value);
    
    const playerDetails = {
        name: playerNameInput.value,
        color: state.pickedColor === "" ? undefined : state.pickedColor.dataset.color,
        existance: playerExistance
    }

    const formValidation = validationController.formValidation(playerDetails);

    if(state.players.length === state.numberOfPlayers) {
        gameController.startGame();
    } else {   
        if(formValidation.flag) {
            notificationView.displayNotification(formValidation.msg, "error");
        } else {
            const fieldToEnterHome = state.playersLastRegularField[state.pickedColor.dataset.color];
            const player = new Player(playerNameInput.value, state.pickedColor.dataset.color, fieldToEnterHome);
            
            disablePickedButton();

            playerView.addPlayerField(state.players.length, playerNameInput.value, state.pickedColor.dataset.color);
            notificationController.showNotifcationHandler("playerAdded");
            
            player.addPlayer();
            formView.changeTextButton();
            
            clearInput(playerNameInput);
            state.pickedColor = "";
        }
    }
}