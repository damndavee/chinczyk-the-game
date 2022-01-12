import { FORM_VALIDATION_MSG } from "../utils/events";

export function formValidation(playerValues) {
    let flag, msg;
    const {name, color, existance} = playerValues;

    switch(true) {
        case (name === "" && color === undefined): {
            msg = FORM_VALIDATION_MSG.NO_PLAYER_NAME_AND_COLOR;
            break;
        }

        case (name === ""): {
            msg = FORM_VALIDATION_MSG.NO_PLAYER_NAME;
            break;
        }

        case (color === undefined): {
            msg = FORM_VALIDATION_MSG.NO_COLOR;
            break;
        }

        case (!existance): {
            msg = FORM_VALIDATION_MSG.PLAYER_EXISTS;
            break;
        }

        case (name.length > 10): {
            msg = FORM_VALIDATION_MSG.NAME_TOO_LONG;
            break;
        }

        case (name.length < 4): {
            msg = FORM_VALIDATION_MSG.NAME_TOO_SHORT;
            break;
        }

        default: {
            break;
        }
    }

    return {
        flag: msg === undefined ? false : true,
        msg
    }
}