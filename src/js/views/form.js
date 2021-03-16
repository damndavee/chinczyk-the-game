import state from "../state";
import {DOM_ELEMENTS} from "../base";
import {lightenDarkenColor, insertHTML} from "../utils/functions";

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

export function addPlayerField(index, name, color) {
    const field = `
        <div class="player" data-name="${name}">
        <div class="player__info">
            <span class="player__index">${index+1})</span>
            <span class="player__name">${name}</span>
        </div>
        <div class="player__actions">
            <div class="player__color" style="background-color: ${color}"></div>
            <div class="player__remove">
                <button class="player__remove-btn">X</button>
            </div>
        </div>
    </div>
    `;

    insertHTML(DOM_ELEMENTS.playersContainer, field)
}