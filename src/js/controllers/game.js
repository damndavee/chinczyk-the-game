import Game from "../models/Game";
import { CLASSES } from "../utils/classes";
import state from "../utils/state";

import * as diceView from "../views/dice";

const game = new Game();

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

export function startGame() {
    game.setTurn();
}

export function rollDice() {
    const diceContainer = document.querySelector("#dice-container");
    game.getDice();
    const receivedDice = state.rolledDice.toString();
    const rolledDice = state.dice[receivedDice];
    const dice = diceView.createDice(rolledDice);
    diceContainer.innerHTML = dice;
    
    const pawns = document.querySelectorAll(`.pawn-${state.activePlayer.color}`);
    pawns.forEach(p => p.classList.add(`${CLASSES.PAWN_ACTIVE_PLAYER}-${state.activePlayer.color}`))

    console.log(pawns);
}

export function movePawn(e) { 
    const selectedPawn = e.target;
    const pawnFieldType = Object.values(e.target.dataset)[0].split("-")[0];
    const pawnPosition = Object.values(e.target.dataset)[0].split("-").slice(1).join("-");

    const pawn = {
        type: pawnFieldType,
        position: pawnPosition,
        color: pawnPosition.split("-")[0]
    }

    const foundPawn = findPawnInState(pawn.color, pawn.position);
    const foundPlayer = findPlayerInState(pawn.color);
    
    const startFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("start"));
    const startField = startFields.find(s => s.dataset.field.split("-")[1] === pawn.color);
    const startFieldDataset = startField.dataset.field;

    console.log(foundPlayer);
    console.log(state);

    if(foundPlayer.name === state.activePlayer.name) {
        selectedPawn.classList.remove(CLASSES.PAWN, CLASSES.PAWN_ACTIVE_PLAYER + `-${state.activePlayer.color}`, CLASSES.PAWN + `-${state.activePlayer.color}`);
        // startField.classList.add(CLASSES.PAWN);
        startField.className += ` ${CLASSES.PAWN} ${CLASSES.PAWN}-${foundPlayer.color}`;
        
        updatePawn(foundPawn, startFieldDataset);
        game.changeTurn();
    }
}