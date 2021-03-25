import state from "../utils/state";
import {DOM_ELEMENTS} from "../utils/base";
import {lightenDarkenColor} from "../utils/functions";

export function changeTextButton() {
    if(state.players.length === state.numberOfPlayers) {
        DOM_ELEMENTS.startGameBtn.textContent = "Start Game!";
    } else {
        DOM_ELEMENTS.startGameBtn.textContent = "Add Player";
    }
}

export function changeHoverColor(flag, color) {
    // flag bascially tells us if the event listener is wheter "mouseover" or "mouseout"
    const hexColorBox = color.dataset.hex.toUpperCase();

    switch (flag) {
        case "enter": {
            color.style.backgroundColor = `#${lightenDarkenColor(hexColorBox, 90)}`;
            break;
        }
        case "out": {
            color.style.backgroundColor = color.dataset.color;
            break;
        }        
        default: {
            color.style.backgroundColor = "black";
            break;
        }
    }
}

