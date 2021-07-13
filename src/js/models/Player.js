import state from "../utils/state";

export default class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
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
    
    static reduceNumberOfPawns(type, flag) {
        const activePlayer = state.players.find(p => p.name === state.activePlayer.name);
        
        switch (type) {
            case "home": {
                break;
            }

            case "base": {
                if(flag === "+") {
                    activePlayer.basePawns++;
                    activePlayer.boardPawns--;
                } else {
                    activePlayer.basePawns--;
                    activePlayer.boardPawns++;
                } 
                break;
            }

            case "board": {
                
                break;
            }
                
            default:
                break;
        }
    } 

    static removePlayer(name) {
        state.players = state.players.filter(i => i.name !== name);
    }
}