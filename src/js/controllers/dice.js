import * as diceView from "../views/dice";

import { CLASSES } from "../utils/classes";
import state from "../utils/state";

export function rollDice() {
    const diceContainer = document.querySelector("#dice-container");
    state.rolledDice = Math.floor(Math.random() * 6 + 1);
    const receivedDice = state.rolledDice.toString();
    const rolledDice = state.dice[receivedDice];
    const dice = diceView.createDice(rolledDice);
    diceContainer.innerHTML = dice;
    
    const pawns = document.querySelectorAll(`.pawn-${state.activePlayer.color}`);
    pawns.forEach(p => p.classList.add(`${CLASSES.PAWN_ACTIVE_PLAYER}-${state.activePlayer.color}`))

    // console.log(pawns);
}