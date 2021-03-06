const state = {
    numberOfPlayers: 2,
    players: [
        {
            name: "Paweł",
            color: "red",
            boardPawns: 0,
            homePawns: 0,
            basePawns: 4,
            pawns: [
                {type: "home", position: "1", color: "red"},
                {type: "home", position: "2", color: "red"},
                {type: "home", position: "3", color: "red"},
                {type: "home", position: "4", color: "red"},
            ]
        },
        {
            name: "Piotr",
            color: "blue",
            boardPawns: 0,
            homePawns: 0,
            basePawns: 4,
            pawns: [
                {type: "home", position: "1", color: "blue"},
                {type: "home", position: "2", color: "blue"},
                {type: "home", position: "3", color: "blue"},
                {type: "home", position: "4", color: "blue"},
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
    activePlayer: {},
    pickedColor: '',
    turn: null,
}

export default state;