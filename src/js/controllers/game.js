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

function updatePawn(pawn, newPosition) {
    const type = newPosition.split("-")[0];
    const position = newPosition.split("-").slice(1).join("-");
    const color = pawn.color ? pawn.color : pawn.position.split("-")[0];

    const updatedPawn = {type, position};


    const playerIndex = state.players.findIndex(p => p.color === color);
    const oldPawnIndex = state.players.find(p => p.color === color).pawns.findIndex(p => p.position === pawn.position);
    
    state.players[playerIndex].pawns[oldPawnIndex] = updatedPawn;
}

function goOutFromBase(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const startFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("start"));
    const activePlayerColor = state.activePlayer.color;
    const activePlayerStartField = startFields.find(field => field.dataset.field.split("-")[1] === activePlayerColor);
    const activePlayerStartFieldDataset = activePlayerStartField.dataset.field;

    if (state.rolledDice === 6 && activePlayerStartField.innerHTML === "") {
        Player.reduceNumberOfPawns("home", "-");
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        pawnController.addPawnToBoard(activePlayerStartField, clickedPawn);
        updatePawn(foundPawn, activePlayerStartFieldDataset);
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
    }
}

function leaveStartField(clickedPawnParentPosition, clickedPawn, foundPawn) {
    let startFieldCount;
    const activePlayerColor = state.activePlayer.color;
    const regularFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("regular"));

    switch (activePlayerColor) {
        case "red": {
            startFieldCount = 0;
            break;
        }

        case "blue": {
            startFieldCount = 9;
            break;
        }

        case "yellow": {
            startFieldCount = 18;
            break;
        }

        case "green": {
            startFieldCount = 27;
            break;
        }
       
        default:
            break;
    }

    const newPosition = `regular-${startFieldCount + state.rolledDice}`;
    const regularFieldToEnter = regularFields.find(field => field.dataset.field === newPosition);

    pawnController.removePawnFromBoard(clickedPawnParentPosition);
    updatePawn(foundPawn, newPosition);
    pawnController.addPawnToBoard(regularFieldToEnter, clickedPawn);
    game.changeTurn();
    clearContainer(DOM_ELEMENTS.gameActions);
    scoreboardView.createScoreboard();
    
}

function moveThroughBoard(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const regularFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("regular"));
    const previousPosition = clickedPawnParentPosition.dataset.field;
    const newPosition = `regular-${+(previousPosition.split("-")[1]) + state.rolledDice}`;

    const regularFieldToEnter = regularFields.find(field => field.dataset.field === newPosition);

    const pawn = {
        ...foundPawn,
        color: clickedPawn.dataset.color
    }

    pawnController.removePawnFromBoard(clickedPawnParentPosition);
    updatePawn(pawn, newPosition);
    pawnController.addPawnToBoard(regularFieldToEnter, clickedPawn);
    game.changeTurn();
    clearContainer(DOM_ELEMENTS.gameActions);
    scoreboardView.createScoreboard();
}

function enterHomeFields() {}

export function movePawn(e) { 
    const clickedPawn = e.target;
    const clickedPawnParentPosition = e.target.parentNode;
    const clickedPawnParentPositionType = e.target.parentNode.dataset.field.split("-")[0];
    const pawnFieldType = Object.values(clickedPawnParentPosition.dataset)[0].split("-")[0];
    const splitedPawnParentPosition = Object.values(clickedPawnParentPosition.dataset)[0].split("-");
    const pawnPosition = splitedPawnParentPosition.length === 3 ? splitedPawnParentPosition.slice(1).join("-") : splitedPawnParentPosition[1];

    const pawn = {
        type: pawnFieldType,
        position: pawnPosition,
        color: clickedPawn.dataset.color
    }

    const foundPawn = findPawnInState(pawn.color, pawn.position);
    const foundPlayer = findPlayerInState(pawn.color);
    
    if(foundPlayer.name === state.activePlayer.name) {
        console.log("can move!");
        switch (clickedPawnParentPositionType) {
            case "home": {
                goOutFromBase(clickedPawnParentPosition, clickedPawn, foundPawn);
                break;
            }

            case "start": {
                leaveStartField(clickedPawnParentPosition, clickedPawn, foundPawn);
                break;
            }

            case "regular": {
                moveThroughBoard(clickedPawnParentPosition, clickedPawn, foundPawn);
                break;
            }

            case "meta": {
                break;
            }


            default:
                break;
        }
        // state.players.forEach(p => console.log(p));
    }
}