import Game from "../models/Game";
import state from "../utils/state";

import * as pawnController from "../controllers/pawn";
import * as boardController from "../controllers/board";
import * as notificationController from "../controllers/notification";

import * as scoreboardView from "../views/scoreboard";

import { checkIfFieldIsEmpty, checkIfTheSameColorPawn, disableButton, findPawnInState, findPlayerInState } from "../utils/functions";
import { DOM_ELEMENTS, getFilteredBoardFields } from "../utils/base";
import { SITUATIONS } from "../utils/events";

const game = new Game();

export function startGame() {
    DOM_ELEMENTS.header.remove();
    DOM_ELEMENTS.gameContainer.style.display = "flex";
    DOM_ELEMENTS.gameActions.style.display = "flex";
    boardController.createBoard();
    game.setTurn();
    scoreboardView.createScoreboard();
    // console.log(state);
    // noMovesHandler("noPawnsOnBoard");
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
        state.activePlayer.diceRolls = 1;
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
        state.activePlayer.diceRolls = 1;
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
        state.activePlayer.diceRolls = 1;
        return fieldToEnter;
    }
}

function enterHomeFields(homePosition, metaFields, foundPlayer) {
    const fieldToEnter = metaFields.find(f => +f.dataset.field === homePosition);
    const isEmpty = fieldToEnter === undefined ? true : checkIfFieldIsEmpty(fieldToEnter);

    console.log(isEmpty);

    if(!isEmpty) {
        console.log("????");
        noMovesHandler("notEmptyField");
        return;
    }

    if(homePosition > 0 && homePosition < 5) {
        pawnController.reduceNumberOfPawns(foundPlayer, "meta", "+");
        return metaFields.find(f => +f.dataset.field === homePosition);
    } else {
        noMovesHandler("overreach");
    }
}

export function isMovePossible() {
    let newPosition;

    const {activePlayer, rolledDice} = state;
    const lastFieldToEnter = activePlayer.lastField;
    const metaFields = getFilteredBoardFields("metaFields").filter(f => f.dataset.playerColor === state.activePlayer.color);
    
    const pawns = [...activePlayer.pawns.filter(pawn => pawn.type !== "home")];
    const pawnsPositionsArray = pawns.map(pawn => ({position: +pawn.position, type: pawn.type, canMove: true}));

    if(activePlayer.homePawns > 0 && activePlayer.boardPawns === 0) {
        noMovesHandler("noPawnsOnBoard");
    }
    
    if(pawns.length > 0) {
        const newPawnsPositionsArray = pawnsPositionsArray.map(pawn => {
            const calculatedPosition = pawn.position + rolledDice;
            const calculatedHomePosition = calculatedPosition - lastFieldToEnter;
            // const fieldToEnter = metaFields.find(f => +f.dataset.field === calculatedPosition);
           
            // const isEmpty = fieldToEnter === undefined ? true : checkIfFieldIsEmpty(fieldToEnter);
            
            newPosition = calculatedPosition > 40 ? calculatedPosition - 40 : calculatedPosition;
            // zrobić osobne fieldToEnter ale tylko dla pól dla mety
            switch (pawn.type) {
                case "regular": {
                    if(calculatedPosition > lastFieldToEnter && pawn.position <= lastFieldToEnter && calculatedHomePosition < 7) {
                        if(calculatedHomePosition < 0 || calculatedHomePosition > 4) {
                            pawn.canMove = false;
                        } else {
                            const fieldToEnter = metaFields.find(f => +f.dataset.field === calculatedHomePosition);
                            console.log("HOMEPOSITION:", calculatedHomePosition);
                            const isEmpty = fieldToEnter === undefined ? false : checkIfFieldIsEmpty(fieldToEnter);
                            isEmpty || (pawn.canMove = false);
                        }
                    }
                    break;
                }
                
                case "meta": {
                    const fieldToEnter = metaFields.find(f => +f.dataset.field === calculatedHomePosition);
                    console.log("HOMEPOSITION:", calculatedHomePosition);
                    const isEmpty = fieldToEnter === undefined ? false : checkIfFieldIsEmpty(fieldToEnter);

                    if(calculatedPosition > 4 || !isEmpty) {
                        pawn.canMove = false;
                    } else {
                        pawn.canMove = true;
                    }
                }
            
                default:
                    break;
            }

            return {
                position: newPosition,
                type: pawn.type,
                canMove: pawn.canMove
            }
        });

        const flag = newPawnsPositionsArray.every(pawn => pawn.canMove === false);
        console.log(flag);
        console.log(newPawnsPositionsArray);
        return flag;
    }
}

export function noMovesHandler(situation, takeoverdPlayer = null,) {
    const player = state.players.find(p => p.name === state.activePlayer.name);
    const metaFields = getFilteredBoardFields("metaFields").filter(f => f.dataset.playerColor === state.activePlayer.color);
    const playerPawnsOnMeta = player.homePawns;


    switch(situation) {
        case SITUATIONS.OVERREACH: {
            player.diceRolls = 1;
            notificationController.showNotifcationHandler("overreach");
            break;
        }

        case SITUATIONS.NO_POTENTIAL_MOVES: {
            player.diceRolls = 1;
            notificationController.showNotifcationHandler("noPotentialMoves");
            break;
        }
        
        case SITUATIONS.NO_ROLLS_LEFT: {
            player.diceRolls = 3;
            notificationController.showNotifcationHandler("noRolls");
            break;
        }
        
        case SITUATIONS.NO_PAWNS_ON_BOARD: {
            const fields = [];
            let flag = false;

            for(let i = metaFields.length - 1; i >= 0; i--) {
                if(i === metaFields.length - playerPawnsOnMeta - 1) {
                    break;
                }

                fields.push(metaFields[i]);
            }

            if(fields.every(field => field.innerHTML != "")) {
                flag = true;
            }

            if(flag && player.isDiceRollUpdated) {
                player.diceRolls = 3;
                player.isDiceRollUpdated = false;
            }

            if(flag && player.boardPawns != 0) {
                player.diceRolls = 1;
            }
            
            if(!flag && player.isDiceRollUpdated) {
                player.diceRolls = 1;
            }

            if(flag && state.rolledDice != 6 && player.diceRolls === 1) {
                notificationController.showNotifcationHandler("noPawnsOnBoard");
            }

            takeoverdPlayer && (takeoverdPlayer.diceRolls = 3);

            break;
        }

        case SITUATIONS.NOT_EMPTY_FIELD: {
            player.diceRolls = 1;
            notificationController.showNotifcationHandler("notEmptyField");
            break;
        }

        default: {
            break;
        }
    }
}

function moveThroughHomeFields(clickedPawnParentPosition) {
    const activePlayerColor = state.activePlayer.color;

    const metaFields = getFilteredBoardFields("metaFields");
    const activePlayerMetaFields = metaFields.filter(f => f.dataset.playerColor === activePlayerColor);

    const previousPosition = clickedPawnParentPosition.dataset.field;

    const newPosition = +previousPosition + state.rolledDice;

    if(newPosition > 4) {
        noMovesHandler("overreach");
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
        
        console.log(takeoveredPlayer.boardPawns);
        takeoveredPlayer.boardPawns === 0 && noMovesHandler("noPawnsOnBoard", takeoveredPlayer);
    }
}
``
export function nextRound() {
    game.changeTurn();
    state.isTurnFinnished = false;
    state.activePlayer.isDiceRollUpdated = true; 
    noMovesHandler("noPawnsOnBoard");
    state.isTurnFinnished = false;
    scoreboardView.resetGameUI();
    // console.log(state);
}

function checkIfGameEnded() {
    if(state.activePlayer.homePawns === 4) {
        state.hasGameEnded = true;
        endGame();
    }
}

function endGame() {
    alert("RUCHAM CI MATKĘ!!111!");
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
            
            checkIfGameEnded();
            // logika za ponowny rzut kostką w przypadku wyrzucenia 6
            state.hasGameEnded ? endGame() : nextRound();
            // if(state.rolledDice !== 6) {
            // }
        }
    }
}