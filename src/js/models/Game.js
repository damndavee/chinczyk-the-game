import state from "../utils/state";

export default class Game {
    constructor() {
        this.tempNumber = 0;
        this.rolledDice = 0;
    }

    setTurn() {
        state.turn = Math.floor(Math.random() * state.players.length);
        this.tempNumber = state.turn;
        state.activePlayer = {
            name: state.players[state.turn].name,
            color: state.players[state.turn].color
        };
    }
    
    changeTurn() {
        this.tempNumber++;
        state.turn = this.tempNumber % state.players.length;
        state.activePlayer = {
            name: state.players[state.turn].name,
            color: state.players[state.turn].color
        };
    }

    getDice() {
        this.rolledDice = Math.floor(Math.random() * 6 + 1);
        state.rolledDice = this.rolledDice;
    }    
}