import { ACTIONS, FORM_VALIDATION_MSG, IN_GAME_MSG } from "../utils/events";

import * as notificationView from "../views/notification";

export function showNotifcationHandler(action) {
    let msg, type = "inGame";

    // console.log(action);

    switch (action) {
        case ACTIONS.PLAYER_ADDED_ACTION: {
            msg = FORM_VALIDATION_MSG.PLAYER_ADDED;
            type = "success";
            break;
        }

        case ACTIONS.PLAYER_REMOVED_ACTION: {
            msg = FORM_VALIDATION_MSG.PLAYER_REMOVED;
            type = "success";
            break;
        }

        case ACTIONS.NO_ROLLS_LEFT_ACTION: {
            msg = IN_GAME_MSG.NO_ROLLS;
            break;
        }

        case ACTIONS.OVERREACH_FIELD_ACTION: {
            msg = IN_GAME_MSG.OVERREACH;
            break;
        }
            
        case ACTIONS.NO_PAWNS_ON_BOARD_ACTION: {
            msg = IN_GAME_MSG.NO_PAWNS_AVAILABLE;
            break;
        }

        case ACTIONS.NO_POTENTIAL_MOVES_ACTION: {
           msg = IN_GAME_MSG.NO_POTENTIAL_MOVES;
           break;
        }

        case ACTIONS.MOVE_IS_POSSIBLE_ACTION: {
            msg = IN_GAME_MSG.MOVE_IS_POSSIBLE;
            break;
        }

        case ACTIONS.NOT_EMPTY_FIELD_ACTION: {
            msg = IN_GAME_MSG.NOT_EMPTY_FIELD;
            break;
        }
            
        default:
            break;
    }

    notificationView.displayNotification(msg, type);
}