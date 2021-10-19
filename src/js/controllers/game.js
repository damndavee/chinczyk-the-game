import Game from "../models/Game";
import state from "../utils/state";

import * as pawnController from "../controllers/pawn";
import * as boardController from "../controllers/board";

import * as scoreboardView from "../views/scoreboard";

import Player from "../models/Player";

import { clearContainer, checkIfFieldIsEmpty, checkIfTheSameColorPawn, findPawnInState, findPlayerInState } from "../utils/functions";
import { DOM_ELEMENTS, getFilteredBoardFields } from "../utils/base";

const game = new Game();

export function startGame() {
    DOM_ELEMENTS.header.remove();
    DOM_ELEMENTS.gameActions.style = "block";
    boardController.createBoard();
    game.setTurn();
    scoreboardView.createScoreboard();
}

function goOutFromBase(foundPawn, foundPlayer) {
    const startFields = getFilteredBoardFields("startFields");
    const activePlayerColor = state.activePlayer.color;
    const activePlayerStartField = startFields.find(field => field.dataset.playerColor === activePlayerColor);

    const isEmpty = checkIfFieldIsEmpty(activePlayerStartField);
    
    if(!isEmpty) {
        state.isTakeover = true;
        takeoverRegularField(activePlayerStartField, foundPawn);
    }

    if (state.rolledDice === 6) {
        pawnController.reduceNumberOfPawns(foundPlayer, "base", "-");
        state.canPlayerMove = true;
        return activePlayerStartField;
    }
}

function leaveStartField(clickedPawnParentPosition, foundPawn) {
    const regularFields = getFilteredBoardFields("regularFields");

    const previousPosition = clickedPawnParentPosition.dataset.field;
    const newPosition = +previousPosition + state.rolledDice;

    const regularFieldToEnter = regularFields.find(f => +f.dataset.field === newPosition);

    const isEmpty = checkIfFieldIsEmpty(regularFieldToEnter);
    
    if(!isEmpty) {
        state.isTakeover = true;
        takeoverRegularField(regularFieldToEnter, foundPawn);
    }
    
    if(state.isDiceRolled) {
        state.canPlayerMove = true;
        return regularFieldToEnter;
    }
}

function moveThroughBoard(clickedPawnParentPosition, foundPawn, foundPlayer) {
    let newPosition;
    let fieldToEnter;

    const activePlayerColor = state.activePlayer.color;
    const activePlayerLastField = foundPlayer.lastField;

    const playableFields = getFilteredBoardFields("playableFields");
    const metaFields = getFilteredBoardFields("metaFields");
    const activePlayerMetaFields = metaFields.filter(f => f.dataset.playerColor === activePlayerColor);
    
    const previousPosition = clickedPawnParentPosition.dataset.field;
    const calculatedPosition = +previousPosition + state.rolledDice;
    const calculatedHomePosition = calculatedPosition - activePlayerLastField;
    
    newPosition = calculatedPosition > 40 ? newPosition = calculatedPosition - 40 : newPosition = calculatedPosition;
    
    if(calculatedPosition > activePlayerLastField && previousPosition <= activePlayerLastField && calculatedHomePosition < 7) {
        fieldToEnter = enterHomeFields(calculatedHomePosition, activePlayerMetaFields, foundPlayer);
    } else {
        fieldToEnter = playableFields.find(f => +f.dataset.field === newPosition);
    }

    const isEmpty = fieldToEnter != undefined ? checkIfFieldIsEmpty(fieldToEnter) : true;
    
    if(!isEmpty) {
        state.isTakeover = true;
        takeoverRegularField(fieldToEnter, foundPawn);
    }

    if(state.isDiceRolled && fieldToEnter != undefined) {
        state.canPlayerMove = true;
        return fieldToEnter;
    }
}

function enterHomeFields(homePosition, metaFields, foundPlayer) {
    if(homePosition > 0 && homePosition < 5) {
        pawnController.reduceNumberOfPawns(foundPlayer, "meta", "+");
        return metaFields.find(f => +f.dataset.field === homePosition);
    } else {
        noMovesHandler("overreach");
    }
}

function noMovesHandler(situation) {
    //const activePlayer = state.players.find(p => p.name === activePlayer.name);

    switch(situation) {
        case "overreach": {
            // 1. overreach - nie można tym pionkiem wejść na metę
            // wyświetlić komunikat o niemożliwym do wykonania ruchu -> wybierz inny pion
            console.log("YOU CANNOT ENTER THIS FIELD!");
            break;
        }

        case "noPawnsOnBoard": {
            // 1. pobrać aktualnego gracza ze state'u
            // 2. zobaczyć, ile posiada pionów na planszy
            // 3. jeśli nie posiada żadnych - 3 rzuty kostką.
            // 4. jesli nie posiada żadnych, ale ma piony na mecie, które mogą wykonać ruch - 1 rzut kostką
            // 5. 
            break;
        }

        default: {
            break;
        }
    }

    // 2.

    
    // sprawdzenie, czy gracz może ruszyć się danym pionem
    // sprawdzenie, czy gracz posiada jakieś piony na planszy
    // wyłączyć" pion, którym gracz nie może wykonać ruchu
    // pokazać odpowiedni komunikat
    // wskazanie pionów, którymi gracz może wykonać ruch
}

function moveThroughHomeFields(clickedPawnParentPosition) {
    const activePlayerColor = state.activePlayer.color;

    const metaFields = getFilteredBoardFields("metaFields");
    const activePlayerMetaFields = metaFields.filter(f => f.dataset.playerColor === activePlayerColor);

    const previousPosition = clickedPawnParentPosition.dataset.field;

    const newPosition = +previousPosition + state.rolledDice;

    if(newPosition > 4) {
        noMovesHandler("overreach");
        // game.changeTurn();
        // clearContainer(DOM_ELEMENTS.gameActions);
        // scoreboardView.createScoreboard();
    } else {
        const fieldToEnter = activePlayerMetaFields.find(f => +f.dataset.field === newPosition);

        const isEmpty = checkIfFieldIsEmpty(fieldToEnter);

        if(isEmpty && state.isDiceRolled) {
            state.canPlayerMove = true;
            return fieldToEnter;
        }
    }
}

function takeoverRegularField(fieldToEnter, foundPawn, foundPlayer) {
    const pawnOnField = fieldToEnter.childNodes[0];
    const playerPawnColor = pawnOnField.dataset.color;

    const baseFields = getFilteredBoardFields("baseFields");
    const activePlayerBaseFields = baseFields.filter(field => field.dataset.playerColor === playerPawnColor);

    const takeover = checkIfTheSameColorPawn(pawnOnField, foundPawn);
    
    if(takeover) {
        const baseFieldToEnter = activePlayerBaseFields.find(bf => bf.dataset.index === pawnOnField.dataset.index);
        const takeoveredPlayer = state.players.find(p => p.color === playerPawnColor);

        const newPawn = {
            type: "home",
            position: baseFieldToEnter.dataset.index,
            color: playerPawnColor,
            index: +baseFieldToEnter.dataset.index
        }

        pawnController.reduceNumberOfPawns(takeoveredPlayer, "base", "+");
        pawnController.updatePawnStateOnBoard(fieldToEnter, baseFieldToEnter, foundPawn, pawnOnField);
        state.players.find(p => p.color === playerPawnColor).pawns[+newPawn.index - 1] = newPawn;
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
        color: clickedPawn.dataset.color,
        index: +clickedPawn.dataset.index
    }

    const foundPawn = findPawnInState(pawn);

    const foundPlayer = findPlayerInState(pawn.color);

    let fieldToEnter;
    
    if(foundPlayer.name === state.activePlayer.name && state.isDiceRolled) {
        switch (clickedPawnParentPositionType) {
            case "home": {
                fieldToEnter = goOutFromBase(foundPawn, foundPlayer);
                break;
            }

            case "start": {
                fieldToEnter = leaveStartField(clickedPawnParent, foundPawn);
                break;
            }

            case "regular": {
                fieldToEnter = moveThroughBoard(clickedPawnParent, foundPawn, foundPlayer, clickedPawn);
                break;
            }

            case "meta": {
                fieldToEnter = moveThroughHomeFields(clickedPawnParent);
                break;
            }

            default:
                break;
        }

        if(state.canPlayerMove) {
            pawnController.updatePawnStateOnBoard(clickedPawnParent, fieldToEnter, foundPawn, clickedPawn);
            
            game.changeTurn();
            clearContainer(DOM_ELEMENTS.gameActions);
            scoreboardView.createScoreboard();
        }
    }
}