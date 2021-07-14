import {fields} from "../utils/fields";
import {DOM_ELEMENTS as domEl} from "../utils/base";
import state from "../utils/state";

import {CLASSES} from "../utils/classes";

function filterFields(filterParam) {
    return fields.filter(({type}) => type === filterParam);
}

function attachPawns() {
    const playerColors = state.players.map(p => p.color);
    const homeColorFields = [...document.querySelectorAll("[data-field]")].filter(f => f.dataset.field.includes("home"));

    homeColorFields.forEach(f => {
        const extractedDataHome = f.dataset.field.split("-");
        if(playerColors.includes(extractedDataHome[1])) {
            f.innerHTML = `<i class="pawn pawn-${extractedDataHome[1]} fas fa-chess-pawn" data-color="${extractedDataHome[1]}" style="color: ${extractedDataHome[1]}; z-index: 10;"></i>`
            // f.className += ` ${CLASSES.PAWN} ${CLASSES.PAWN}-${extractedDataHome[1]}`;
            // f.style.backgroundColor = extractedDataHome[1];
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

    for (const {type, color} of startFields) {
        const field = document.createElement("div");
        field.className = `field field-play ${color} ${color}-${type}`;
        field.dataset.field = `start-${color}-1`

        container.appendChild(field);
    }
}

function createHomeFields(container) {
    const homeFields = filterFields("home");

    for (const {type, color, position} of homeFields) {
        const field = document.createElement("div");
        field.className = `field ${color} ${color}-${type}`;
        field.dataset.field = `home-${color}-${position}`;

        container.appendChild(field);
    }
}

function createMetaFields(container) {
    const metaFields = filterFields("meta");

    for (const {color, position} of metaFields) {
        const field = document.createElement("div");
        field.className = `field ${color}`;
        field.dataset.field = `meta-${color}-${position}`;

        container.appendChild(field);
    }
}

function createRegularFields(container) {
    const regularFields = filterFields("regular");
    
    for (const {position} of regularFields) {
        const field = document.createElement("div");
        field.className = `field field-play field-${position}`;
        field.dataset.field = `regular-${position}`;

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
