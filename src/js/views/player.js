import {DOM_ELEMENTS} from "../base";
import {insertHTML} from "../utils/functions";

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