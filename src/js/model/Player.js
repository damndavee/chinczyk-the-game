import state from "../state";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    addPlayerToState() {
        state.players.push({...this, pawns: 4});
    }
}