import Game from "../models/Game";
import state from "../utils/state";

import * as pawnController from "../controllers/pawn";
import * as boardController from "../controllers/board";

import * as scoreboardView from "../views/scoreboard";

import Player from "../models/Player";
import { clearContainer } from "../utils/functions";
import { DOM_ELEMENTS } from "../utils/base";

const game = new Game();

export function startGame() {
    DOM_ELEMENTS.header.remove();
    DOM_ELEMENTS.gameActions.style = "block";
    boardController.createBoard();
    game.setTurn();
    scoreboardView.createScoreboard();
}

function findPawnInState(color, position) {
    return state.players.find(player => player.color === color).pawns.find(pawn => pawn.position === position);
}

function findPlayerInState(color) {
    return state.players.find(player => player.color === color);
}

function updatePawn(pawn, newPosition, color) {
    const type = newPosition.dataset.type;
    const position = newPosition.dataset.field;

    const updatedPawn = {type, position, color};

    const playerIndex = state.players.findIndex(p => p.color === color);
    const oldPawnIndex = state.players.find(p => p.color === color).pawns.findIndex(p => p.position === pawn.position);
    
    state.players[playerIndex].pawns[oldPawnIndex] = updatedPawn;
}

function goOutFromBase(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const startFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("start"));
    const activePlayerColor = state.activePlayer.color;
    const activePlayerStartField = startFields.find(field => field.dataset.playerColor === activePlayerColor);

    if (state.rolledDice === 6 && activePlayerStartField.innerHTML === "") {
        // zastanowić się, czy nie wrzucić tego kodu do głównej metody movePawn (sprawdzić, czy to zadziała)
        Player.reduceNumberOfPawns("home", "-");
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        pawnController.addPawnToBoard(activePlayerStartField, clickedPawn);
        updatePawn(foundPawn, activePlayerStartField, activePlayerColor);
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
        state.isDiceRolled = false;
    }
}

function leaveStartField(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const activePlayerColor = state.activePlayer.color;

    const regularFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("regular"));

    const previousPosition = clickedPawnParentPosition.dataset.field;
    const newPosition = +previousPosition + state.rolledDice;

    const regularFieldToEnter = regularFields.find(f => +f.dataset.field === newPosition);

    if(state.isDiceRolled) {
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        updatePawn(foundPawn, regularFieldToEnter, activePlayerColor);
        pawnController.addPawnToBoard(regularFieldToEnter, clickedPawn);
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
        state.isDiceRolled = false;
    }    
}

function moveThroughBoard(clickedPawnParentPosition, clickedPawn, foundPawn, foundPlayer) {
    let newPosition;
    let fieldToEnter;

    const activePlayerColor = state.activePlayer.color;
    const activePlayerLastField = foundPlayer.lastField;

    const playableFields = [...document.querySelectorAll("[data-playable]")];
    const metaFields = [...document.querySelectorAll("[data-type]")].filter(f => f.dataset.type === "meta");
    const activePlayerMetaFields = metaFields.filter(f => f.dataset.playerColor === activePlayerColor);
    
    const previousPosition = clickedPawnParentPosition.dataset.field;
    const calculatedPosition = +previousPosition + state.rolledDice;
    const calculatedHomePosition = calculatedPosition - activePlayerLastField;
    
    newPosition = calculatedPosition > 40 ? newPosition = calculatedPosition - 40 : newPosition = calculatedPosition;
    
    if(calculatedPosition > activePlayerLastField && previousPosition <= activePlayerLastField && calculatedHomePosition < 5) {
        fieldToEnter = activePlayerMetaFields.find(f => +f.dataset.field === calculatedHomePosition);
    } else {
        fieldToEnter = playableFields.find(f => +f.dataset.field === newPosition);
    }

    if(state.isDiceRolled) {
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        updatePawn(foundPawn, fieldToEnter, activePlayerColor);
        pawnController.addPawnToBoard(fieldToEnter, clickedPawn);
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
        state.isDiceRolled = false;
    }
}

function enterHomeFields(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const activePlayerColor = state.activePlayer.color;

    const metaFields = [...document.querySelectorAll("[data-type]")].filter(f => f.dataset.type === "meta");
    const activePlayerMetaFields = metaFields.filter(f => f.dataset.playerColor === activePlayerColor);

    const previousPosition = clickedPawnParentPosition.dataset.field;

    const newPosition = +previousPosition + state.rolledDice;

    if(newPosition > 4) {
        // game.changeTurn();
        console.log("CANNOT ENTER FIELD!");
    } else {
        const fieldToEnter = activePlayerMetaFields.find(f => +f.dataset.field === newPosition);
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        updatePawn(foundPawn, fieldToEnter, activePlayerColor);
        pawnController.addPawnToBoard(fieldToEnter, clickedPawn);
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
        state.isDiceRolled = false;
    }


}

export function movePawn(e) { 
    const clickedPawn = e.target;
    const clickedPawnParent = e.target.parentNode;
    const clickedPawnParentPositionType = e.target.parentNode.dataset.type;
    const clickedPawnParentFieldPosition = e.target.parentNode.dataset.field;

    const pawn = {
        type: clickedPawnParentPositionType,
        position: clickedPawnParentFieldPosition,
        color: clickedPawn.dataset.color
    }

    const foundPawn = findPawnInState(pawn.color, pawn.position);
    const foundPlayer = findPlayerInState(pawn.color);
    
    if(foundPlayer.name === state.activePlayer.name) {
        switch (clickedPawnParentPositionType) {
            case "home": {
                goOutFromBase(clickedPawnParent, clickedPawn, foundPawn);
                break;
            }

            case "start": {
                leaveStartField(clickedPawnParent, clickedPawn, foundPawn);
                break;
            }

            case "regular": {
                moveThroughBoard(clickedPawnParent, clickedPawn, foundPawn, foundPlayer);
                break;
            }

            case "meta": {
                enterHomeFields(clickedPawnParent, clickedPawn, foundPawn);
                break;
            }


            default:
                break;
        }
    }
}