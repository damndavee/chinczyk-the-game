export const ACTIONS = {
    PLAYER_ADDED_ACTION: "playerAdded",
    PLAYER_REMOVED_ACTION: "playerRemoved",
    NO_ROLLS_LEFT_ACTION: "noRolls",
    OVERREACH_FIELD_ACTION: "overreach",
    NO_PAWNS_ON_BOARD_ACTION: "noPawnsOnBoard",
    NO_POTENTIAL_MOVES_ACTION: "noPotentialMoves",
    MOVE_IS_POSSIBLE_ACTION: "moveIsPossible",
    NOT_EMPTY_FIELD_ACTION: "notEmptyField"
}

export const VARIANTS = {
    ERROR_VARIANT: "error",
    SUCCESS_VARIANT: "success",
    IN_GAME_VARIANT: "inGame",
}

export const FORM_VALIDATION_MSG = {
    PLAYER_ADDED: "Pomyślnie dodano gracza!",
    PLAYER_REMOVED: "Gracz został usunięty z rozgrywki!",
    NO_PLAYER_NAME_AND_COLOR: "Nie wybrano ani koloru, ani nazwy gracza!",
    NO_PLAYER_NAME: "Nie wybrano nazwy gracza!",
    NO_COLOR: "Nie wybrano koloru gracza!",
    PLAYER_EXISTS: "Gracz z taką nazwą już istnieje!",
    NAME_TOO_LONG: "Nazwa jest zbyt długa. Długość nazwy powinna być między 4 i 10 znakami!",
    NAME_TOO_SHORT: "Nazwa jest zbyt krótka. Długość nazwy powinna być między 4 i 10 znakami!",
}

export const IN_GAME_MSG = {
    OVERREACH: "Nie możesz wykonać ruchu! Pole, na które chcesz wejść nie istnieje!",
    NO_ROLLS: 'Brak rzutów kostką. Zakończ turę klikając w przycisk "Zakończ turę".',
    NO_PAWNS_AVAILABLE: 'Brak pionka, którym można wykonać ruch! Zakończ turę klikając w przycisk "Zakończ turę".',
    NO_POTENTIAL_MOVES: "Brak możliwości ruchu! ",
    MOVE_IS_POSSIBLE: "Kliknij pionek, którym chcesz wykonać ruch.",
    NOT_EMPTY_FIELD: "Nie można wykonać ruchu. To pole jest już zajęte przez inny pionek."
}

export const SITUATIONS = {
    OVERREACH: "overreach",
    NO_ROLLS_LEFT: "noRollsLeft",
    NO_PAWNS_ON_BOARD: "noPawnsOnBoard",
    NO_POTENTIAL_MOVES: "noPotentialMoves",
    NOT_EMPTY_FIELD: "notEmptyField"
}

export const ROLL_BTN_CONTENT = {
    ROLL: "Rzut Kostką",
    MAKE_MOVE: "Wykonaj Ruch",
    END_TURN: "Zakończ Turę"
}