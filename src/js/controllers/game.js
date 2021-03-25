import { CLASSES } from "../utils/classes";
import state from "../utils/state";

function findPawnInState(color, position) {
    return state.players.find(player => player.color === color).pawns.find(pawn => pawn.position === position);
}

function updatePawn(pawn, newPosition) {
    const type = newPosition.split("-")[0];
    const position = newPosition.split("-").slice(1).join("-");
    const color = pawn.position.split("-")[0];

    const updatedPawn = {type, position};

    const playerIndex = state.players.findIndex(p => p.color === color);
    const oldPawnIndex = state.players.find(p => p.color === color).pawns.findIndex(p => p.position === pawn.position);
    
    state.players[playerIndex].pawns[oldPawnIndex] = updatedPawn;
}

export function movePawn(e) {
    // const fields = [...document.querySelectorAll("[data-field]")];
    // fields.forEach(f => console.log(f.dataset.field));
    // setTurn();
    const selectedPawn = e.target;
    
    const pawnFieldType = Object.values(e.target.dataset)[0].split("-")[0];
    const pawnPosition = Object.values(e.target.dataset)[0].split("-").slice(1).join("-");

    const pawn = {
        type: pawnFieldType,
        position: pawnPosition,
        color: pawnPosition.split("-")[0]
    }

    const foundPawn = findPawnInState(pawn.color, pawn.position);

    const startFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("start"));
    const startField = startFields.find(s => s.dataset.field.split("-")[1] === pawn.color);

    const startFieldDataset = startField.dataset.field;
    
    selectedPawn.classList.remove(CLASSES.PAWN);
    startField.classList.add(CLASSES.PAWN);
    
    updatePawn(foundPawn, startFieldDataset);

    console.log(state);
}