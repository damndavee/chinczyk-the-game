import state from "../utils/state";

export default class Game {
    constructor() {
        this.tempNumber = 0;
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
        state.rolledDice = null;
        this.tempNumber++;
        state.turn = this.tempNumber % state.players.length;
        state.activePlayer = {
            name: state.players[state.turn].name,
            color: state.players[state.turn].color
        };
        state.isDiceRolled = false;
        state.canPlayerMove = false;
    }
}