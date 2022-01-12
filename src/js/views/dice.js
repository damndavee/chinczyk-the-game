import state from "../utils/state";

export function updateRollDiceBtnText(text) {
    document.querySelector("#dice-btn").innerHTML = text;
}

export function createDice(rolledDice) {
    const dice = `
        <div class="dice-container__dice fas fa-dice-${rolledDice}" id="dice" style="color: ${state.activePlayer.color};"></div>
    `;
    return dice;
}