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
    const color = pawn.position.split("-")[0];

    const updatedPawn = {type, position};

    const playerIndex = state.players.findIndex(p => p.color === color);
    const oldPawnIndex = state.players.find(p => p.color === color).pawns.findIndex(p => p.position === pawn.position);
    
    state.players[playerIndex].pawns[oldPawnIndex] = updatedPawn;
}

export function goOutFromBase(clickedPawnParentPosition, clickedPawn, foundPawn) {
    const startFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("start"));
    const activePlayerColor = state.activePlayer.color;
    const activePlayerStartField = startFields.find(field => field.dataset.field.split("-")[1] === activePlayerColor);
    const activePlayerStartFieldDataset = activePlayerStartField.dataset.field;

    if (state.rolledDice === 6 && activePlayerStartField.innerHTML === "") {
        Player.reduceNumberOfPawns("base", "-");
        pawnController.removePawnFromBoard(clickedPawnParentPosition);
        pawnController.addPawnToBoard(activePlayerStartField, clickedPawn);
        updatePawn(foundPawn, activePlayerStartFieldDataset);
        state.rolledDice = null;
        game.changeTurn();
        clearContainer(DOM_ELEMENTS.gameActions);
        scoreboardView.createScoreboard();
    }
}

function moveThroughBoard() {}

function enterHomeFields() {}

export function movePawn(e) { 
    const clickedPawn = e.target;
    const clickedPawnParentPosition = e.target.parentNode;
    const clickedPawnParentPositionType = e.target.parentNode.dataset.field.split("-")[0];
    const pawnFieldType = Object.values(clickedPawnParentPosition.dataset)[0].split("-")[0];
    const pawnPosition = Object.values(clickedPawnParentPosition.dataset)[0].split("-").slice(1).join("-");

    const pawn = {
        type: pawnFieldType,
        position: pawnPosition,
        color: pawnPosition.split("-")[0]
    }

    const foundPawn = findPawnInState(pawn.color, pawn.position);
    const foundPlayer = findPlayerInState(pawn.color);
    
    if(foundPlayer.name === state.activePlayer.name) {
        switch (clickedPawnParentPositionType) {
            case "home": {
                goOutFromBase(clickedPawnParentPosition, clickedPawn, foundPawn);
                break;
            }

            case "regular": {
                break;
            }

            case "start": {
                break;
            }

            case "meta": {
                break;
            }


            default:
                break;
        }
        console.log(state);
    }
}