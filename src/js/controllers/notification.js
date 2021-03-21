export function errorHandler(player) {
    let msg;
    let flag;

    switch (true) {
        case (player.name === "" && player.color === undefined): {
            msg = "Neither player name nor color was choosen!";
            break;
        }
        case player.name === "": {
            msg = "No player name was choosen!";
            break;
        }
        case player.color === undefined: {
            msg = "No color was choosen!";
            break;
        }
        case !player.existance: {
            msg = "Player with that name already exists!";
            break;
        }
        case player.name.length > 10: {
            msg = "Name is too long. Choose between 4 and 10 characters!";
            break;
        }
        case player.name.length < 4: {
            msg = "Name is too short. Choose between 4 and 10 characters!";
            break;
        }
        default:
            break;
    } 
    return {
        flag: msg === undefined ? false : true,
        msg
    }
}

export function successHandler(action) {
    let msg;
    
    switch (action) {
        case "playerAdded": {
            msg = "Player has been added!"
            break;
        }
        case "playerRemoved": {
            msg = "Player has been removed!"
            break;
        }
        default:
            break;
    }

    return msg;
}