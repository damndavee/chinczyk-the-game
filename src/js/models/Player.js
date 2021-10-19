import state from "../utils/state";

export default class Player {
    constructor(name, color, fieldToEnterHome) {
        this.name = name;
        this.color = color;
        this.fieldToEnterHome = fieldToEnterHome;
        this.boardPawns = 0;
        this.homePawns = 0;
        this.basePawns = 4;
        this.pawns = [];
    }

    createPawns() {
        const pawns = [];
        for(let i = 0; i < 4; i++) {
            pawns.push({type: "home", position: `${this.color}-${i+1}`})
        }
        this.pawns = pawns;
    }

    addPlayer() {
        this.createPawns();
        state.players.push({...this, pawns: this.pawns});
    }

    static removePlayer(name) {
        state.players = state.players.filter(i => i.name !== name);
    }
}