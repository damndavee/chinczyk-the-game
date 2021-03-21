import {field, fields} from "../utils/fields";
import {DOM_ELEMENTS as domEl} from "../base";
import state from "../state";

function filterFields(filterParam) {
    return fields.filter(({type}) => type === filterParam);
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
        field.dataset.start = `${color}`

        container.appendChild(field);
    }
}

function createHomeFields(container) {
    const homeFields = filterFields("home");

    for (const {type, color, position} of homeFields) {
        const field = document.createElement("div");
        field.className = `field ${color} ${color}-${type}`;
        field.dataset.home = `${color}-${position}`;

        container.appendChild(field);
    }
}

function createMetaFields(container) {
    const metaFields = filterFields("meta");

    for (const {color, position} of metaFields) {
        const field = document.createElement("div");
        field.className = `field ${color}`;
        field.dataset.meta = `${color}-${position}`;

        container.appendChild(field);
    }
}

function createRegularFields(container) {
    const regularFields = filterFields("regular");
    
    for (const {position} of regularFields) {
        const field = document.createElement("div");
        field.className = `field field-play field-${position}`;
        field.dataset.regular = position;

        container.appendChild(field);
    }
}

export function createBoard() {
    const board = document.createElement("div");
    board.classList.add("board");
    domEl.gameContainer.appendChild(board);

    createStartFields(board);
    createHomeFields(board);
    createMetaFields(board);
    createRegularFields(board);
    createNameTemplates(board);
}
