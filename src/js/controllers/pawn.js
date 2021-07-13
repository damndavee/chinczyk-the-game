import { CLASSES } from "../utils/classes";
import state from "../utils/state";

export function removePawnFromBoard(field) {
    field.innerHTML = "";
    // field.classList.remove(CLASSES.PAWN, CLASSES.PAWN_ACTIVE_PLAYER + `-${state.activePlayer.color}`, CLASSES.PAWN + `-${state.activePlayer.color}`);
}

export function addPawnToBoard(field, pawn) {
    field.append(pawn);
    // field.className += ` ${CLASSES.PAWN} ${CLASSES.PAWN}-${foundPlayer.color}`;
}