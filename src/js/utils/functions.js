import state from "./state";

export function clearContainer(container) {
    container.innerHTML = "";
}

export function clearInput(input) {
    input.value = "";
}

export function insertHTML(parent, child, position = "beforeend") {
	parent.insertAdjacentHTML(position, child);
}

export function disableButton(button, flag) {
	button.disabled = flag;
}

export function checkIfFieldIsEmpty(fieldToEnter) {
    return fieldToEnter.innerHTML === "" ? true : false;
}

export function checkIfTheSameColorPawn(pawnOnField, foundPawn) {
    return pawnOnField.dataset.color !== foundPawn.color;
} 

export function findPawnInState(pawn) {
    return state.players.find(player => player.color === pawn.color).pawns.find(p => p.index === pawn.index);
}

export function findPlayerInState(color) {
    return state.players.find(player => player.color === color);
}

//provided by:
//https://jsfiddle.net/stbh1g54/11/
export function lightenDarkenColor (col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) {
		r = 255;
	} else if (r < 0) {
		r = 0;
	}
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) {
		b = 255;
	} else if (b < 0) {
		b = 0;
	}
	var g = (num & 0x0000FF) + amt;
	if (g > 255) {
		g = 255;
	} else if (g < 0) {
		g = 0;
	}
	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}