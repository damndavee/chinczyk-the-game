import {fields} from "../utils/fields";
import {DOM_ELEMENTS as domEl} from "../utils/base";
import state from "../utils/state";

import {CLASSES} from "../utils/classes";

function filterFields(filterParam) {
    return fields.filter(({type}) => type === filterParam);
}

function attachPawns() {
    const playerColors = state.players.map(p => p.color);
    const homeColorFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.type.includes("home"));

    homeColorFields.forEach(f => {
        const extractedDataColor = f.dataset.playerColor;
        if (playerColors.includes(extractedDataColor)) {
            f.innerHTML = `<i class="pawn pawn-${extractedDataColor} fas fa-chess-pawn" data-color="${extractedDataColor}" style="color: ${extractedDataColor}; z-index: 10;"></i>`
        }
    })
}

function createNameTemplates(container) {
    const nameTemplateFields = filterFields("name");

    for (const {classField, classColor, color} of nameTemplateFields) {
        const nameTemplate = document.createElement("div");
        const player = state.players.find(p => p.color === color);
        nameTemplate.className = `${classField} ${classColor}`;
        if(player) {
            nameTemplate.innerText = player.name;
        }
        container.appendChild(nameTemplate);
    }
}

function createStartFields(container) {
    const startFields = filterFields("start");

    for (const {type, color, position} of startFields) {
        const field = document.createElement("div");
        field.className = `field field-play ${color} ${color}-${type}`;
        field.dataset.type = `start`
        field.dataset.field = `${position}`;
        field.dataset.playerColor = `${color}`;
        field.dataset.playable = true;

        container.appendChild(field);
    }
}

function createHomeFields(container) {
    const homeFields = filterFields("home");

    for (const {type, color, position} of homeFields) {
        const field = document.createElement("div");
        field.className = `field ${color} ${color}-${type} ${color}-${type}-${position}`;
        // field.dataset.field = `home-${color}-${position}`;
        field.dataset.type = `home`
        field.dataset.field = `${position}`
        field.dataset.playerColor = `${color}`

        container.appendChild(field);
    }
}

function createMetaFields(container) {
    const metaFields = filterFields("meta");

    for (const {color, position} of metaFields) {
        const field = document.createElement("div");
        field.className = `field ${color} ${color}-meta-${position}`;
        field.dataset.type = `meta`;
        field.dataset.field = `${position}`;
        field.dataset.playerColor = `${color}`;
        
        container.appendChild(field);
    }
}

function createRegularFields(container) {
    const regularFields = filterFields("regular");
    
    for (const {position} of regularFields) {
        const field = document.createElement("div");
        field.className = `field field-play field-${position}`;
        field.dataset.type = `regular`;
        field.dataset.field = `${position}`;
        field.dataset.playable = true;

        container.appendChild(field);
    }
}

function createActionsPanel() {
    domEl.gameActions.style.display = "block";
}

export function createBoard() {
    const board = document.createElement("div");
    board.classList.add(CLASSES.BOARD);
    domEl.gameBoard.appendChild(board);

    createStartFields(board);
    createHomeFields(board);
    createMetaFields(board);
    createRegularFields(board);
    createNameTemplates(board);
    createActionsPanel();
    attachPawns();
}
