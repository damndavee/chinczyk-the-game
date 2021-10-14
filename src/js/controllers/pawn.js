import state from "../utils/state";

function updatePawn(pawn, newPosition, color) {
    const type = newPosition.dataset.type;
    const position = newPosition.dataset.field;
    const index = pawn.index;

    const updatedPawn = {type, position, color, index};

    const playerIndex = state.players.findIndex(p => p.color === color);
    const oldPawnIndex = state.players.find(p => p.color === color).pawns.findIndex(p => p.index === pawn.index);
    
    state.players[playerIndex].pawns[oldPawnIndex] = updatedPawn;
}

function removePawnFromBoard(field) {
    const fieldChildren = [...field.children];

    fieldChildren.length === 1 ? field.innerHTML = "" : fieldChildren.splice(0,1);

}

function addPawnToBoard(field, pawn) {
    field.append(pawn);
}

export function updatePawnStateOnBoard(parentPosition, fieldToEnter, foundPawn, clickedPawn) {
    removePawnFromBoard(parentPosition);
    updatePawn(foundPawn, fieldToEnter, state.activePlayer.color);
    addPawnToBoard(fieldToEnter, clickedPawn);
}