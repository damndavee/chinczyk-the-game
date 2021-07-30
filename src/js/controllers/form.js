import {DOM_ELEMENTS} from "../utils/base";
import state from "../utils/state";
import {clearInput} from "../utils/functions";
import {CLASSES} from "../utils/classes";

import Player from "../models/Player";
import Game from "../models/Game";

import * as formView from "../views/form";
import * as playerView from "../views/player";
import * as notificationView from "../views/notification";
import * as scoreboardView from "../views/scoreboard";

import * as notificationController from "../controllers/notification";
import * as boardController from "../controllers/board";
import * as gameController from "../controllers/game";


const {playersFields, playerNameInput, colorPickerButtons} = DOM_ELEMENTS;

const game = new Game();

function addFieldToEnterHome(color) {
    let field;
    
    switch (color) {
        case "red": {
            field = 40;
            break;
        }

        case "green": {
            field = 30;
            break;
        }
    
        case "yellow": {
            field = 20;
            break;
        }
    
        case "blue": {
            field = 10;
            break;
        }
    
        default:
            break;
    }

    return field;
}

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
    const valuesToCheck = {
        name: playerNameInput.value,
        color: state.pickedColor === "" ? undefined : state.pickedColor.dataset.color,
        existance: playerExistance
    }
    const error = notificationController.errorHandler(valuesToCheck);
    const success = notificationController.successHandler("playerAdded");

    if(state.players.length === state.numberOfPlayers) {
        gameController.startGame();
    } else {   
        if(error.flag) {
            notificationView.displayNotification(error.msg, "error");
        } else {
            const fieldToEnterHome = addFieldToEnterHome(state.pickedColor.dataset.color);
            const player = new Player(playerNameInput.value, state.pickedColor.dataset.color, fieldToEnterHome);
            
            disablePickedButton();

            playerView.addPlayerField(state.players.length, playerNameInput.value, state.pickedColor.dataset.color);
            notificationView.displayNotification(success, "success");
            
            player.addPlayer();
            formView.changeTextButton();
            
            clearInput(playerNameInput);
            state.pickedColor = "";
        }
    }
}