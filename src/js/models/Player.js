import state from "../state";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.pawns = [];
    }

    createPawns() {
        const pawns = [];
        for(let i = 0; i < 4; i++) {
            pawns.push({poistion: `${this.color}-${i+1}`})
        }
        this.pawns = pawns;
    }
    static addPlayer(player) {
        state.players.push({...player, pawns: this.pawns});
    }

    static removePlayer(name) {
        state.players = state.players.filter(i => i.name !== name);
    }
}