import state from "../utils/state";

export class Game {
    constructor() {
        this.tempNumber = 0;
    }

    static setTurn() {
        state.turn = Math.floor(Math.random() * state.players.length);
    }

    changeTurn() {

    }
}