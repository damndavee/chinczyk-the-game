import state from "../state";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    static addPlayer(player) {
        state.players.push({...player, pawns: 4});
    }

    static removePlayer(name) {
        state.players = state.players.filter(i => i.name !== name);
    }
}