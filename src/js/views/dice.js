export function createDice(rolledDice) {
    const dice = `
        <div class="game__controls-dice fas fa-dice-${rolledDice}" id="dice"></div>
    `;
    return dice;
}