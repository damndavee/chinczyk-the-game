import {field, fields} from "../utils/fields";
import {DOM_ELEMENTS as domEl} from "../base";

export default class Board {
    filterFields(filterParam) {
        return fields.filter(({type}) => type === filterParam);
    }

    createStartFields(container) {
        const startFields = this.filterFields("start");

        for (const {type, color} of startFields) {
            const field = document.createElement("div");
            field.className = `field field-play ${color} ${color}-${type}`;
            field.dataset.start = `${color}`

            container.appendChild(field);
        }
    }

    createHomeFields(container) {
        const homeFields = this.filterFields("home");

        for (const {type, color, position} of homeFields) {
            const field = document.createElement("div");
            field.className = `field ${color} ${color}-${type}`;
            field.dataset.home = `${color}-${position}`;

            container.appendChild(field);
        }
    }

    createMetaFields(container) {
        const metaFields = this.filterFields("meta");

        for (const {color, position} of metaFields) {
            const field = document.createElement("div");
            field.className = `field ${color}`;
            field.dataset.meta = `${color}-${position}`;

            container.appendChild(field);
        }
    }

    createRegularFields(container) {
        const regularFields = this.filterFields("regular");
        
        for (const {position} of regularFields) {
            const field = document.createElement("div");
            field.className = `field field-play field-${position}`;
            field.dataset.regular = position;

            container.appendChild(field);
        }
    }

    createBoard() {
        const board = document.createElement("div");
        board.classList.add("board");
        domEl.gameContainer.appendChild(board);

        this.createStartFields(board);
        this.createHomeFields(board);
        this.createMetaFields(board);
        this.createRegularFields(board);
    }
}