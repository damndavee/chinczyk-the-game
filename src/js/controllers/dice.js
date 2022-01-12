import * as diceView from "../views/dice";
import * as scoreboardView from "../views/scoreboard";

import * as gameController from "../controllers/game";
import * as notificationController from "../controllers/notification";

import state from "../utils/state";

import { disableButton } from "../utils/functions";
import { ROLL_BTN_CONTENT } from "../utils/events";

export function rollDice(e) {
    const diceContainer = document.querySelector("#dice-container");
    const activePlayerPawnsOnBoard = state.activePlayer.boardPawns;
    const activePlayerPawnsOnMeta = state.activePlayer.homePawns;

    state.rolledDice = Math.floor(Math.random() * 6 + 1);
    const receivedDice = state.rolledDice.toString();
    const rolledDice = state.dice[receivedDice];
    const dice = diceView.createDice(rolledDice);
    diceContainer.innerHTML = dice;
    state.isDiceRolled = true;
    
    const isMovePossible = gameController.isMovePossible();

    state.activePlayer.diceRolls--;

    if(activePlayerPawnsOnBoard === 0 && state.rolledDice === 6) {
        notificationController.showNotifcationHandler("moveIsPossible");
    } else {
        scoreboardView.updateAlertUI();
    }
    
    scoreboardView.updateStatsUI();

    if(state.rolledDice === 6) {
        diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.MAKE_MOVE);
        disableButton(e.target, true);
    } else {
        diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.ROLL);
    }
    
    if(state.activePlayer.diceRolls === 0) {
        /* 
            dodać klasy:
            .disabled
            .turn-end
            .can-move
        */
        switch (true) {
            case activePlayerPawnsOnBoard != 0: {
                console.log("TUTAJ SIĘ WYKONUJĄ CZARY 1");
                if(isMovePossible && state.rolledDice != 6) {
                    console.log("TUTAJ SIĘ WYKONUJĄ CZARY 2");
                    state.isTurnFinnished = true;
                    diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.END_TURN);
                    gameController.noMovesHandler("noPotentialMoves");
                    return;
                };

                console.log("TUTAJ SIĘ WYKONUJĄ CZARY 3");
                diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.MAKE_MOVE);
                notificationController.showNotifcationHandler("moveIsPossible");
                disableButton(e.target, true);
                state.isTurnFinnished = true;
                break;
            }

            case activePlayerPawnsOnBoard === 0 && activePlayerPawnsOnMeta === 0: {
                if(state.rolledDice !== 6) {
                    gameController.noMovesHandler("noRollsLeft");
                    diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.END_TURN);
                    state.isTurnFinnished = true;
                } 
                break;
            }

            case activePlayerPawnsOnBoard === 0 && activePlayerPawnsOnMeta != 0: {
                console.log("TUTAJ SPRAWDZAM: ", isMovePossible);
                if(isMovePossible && state.rolledDice != 6) {
                    state.isTurnFinnished = true;
                    diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.END_TURN);
                    gameController.noMovesHandler("noPotentialMoves");
                    return;
                }

                diceView.updateRollDiceBtnText(ROLL_BTN_CONTENT.MAKE_MOVE);
                notificationController.showNotifcationHandler("moveIsPossible");
                disableButton(e.target, true);
                state.isTurnFinnished = true;
                break;
            }

        
            default:
                break;
        }
        // disableButton(e.target, true);
    }
}