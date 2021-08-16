const state = {
    numberOfPlayers: 2,
    players: [
        {
            name: "Paweł",
            color: "red",
            boardPawns: 0,
            homePawns: 0,
            basePawns: 4,
            lastField: 40,
            pawns: [
                {type: "home", position: "1", color: "red", index: 1},
                {type: "home", position: "2", color: "red", index: 2},
                {type: "home", position: "3", color: "red", index: 3},
                {type: "home", position: "4", color: "red", index: 4},
            ]
        },
        {
            name: "Piotr",
            color: "blue",
            boardPawns: 0,
            homePawns: 0,
            basePawns: 4,
            lastField: 10,
            pawns: [
                {type: "home", position: "1", color: "blue", index: 1},
                {type: "home", position: "2", color: "blue", index: 2},
                {type: "home", position: "3", color: "blue", index: 3},
                {type: "home", position: "4", color: "blue", index: 4},
            ]           
        },
        // {
        //     name: "Józef",
        //     color: "yellow",
        //     boardPawns: 0,
        //     homePawns: 0,
        //     basePawns: 4,
        //     pawns: [
        //         {type: "home", position: "yellow-1"},
        //         {type: "home", position: "yellow-2"},
        //         {type: "home", position: "yellow-3"},
        //         {type: "home", position: "yellow-4"},
        //     ]
        // },
        // {
        //     name: "Witold",
        //     color: "green",
        //     boardPawns: 0,
        //     homePawns: 0,
        //     basePawns: 4,
        //     pawns: [
        //         {type: "home", position: "green-1"},
        //         {type: "home", position: "green-2"},
        //         {type: "home", position: "green-3"},
        //         {type: "home", position: "green-4"},
        //     ]
        // }
    ],
    // players: [],
    dice: {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six"
    },
    rolledDice: null,
    isDiceRolled: false,
    activePlayer: {},
    pickedColor: '',
    turn: null,
}

export default state;