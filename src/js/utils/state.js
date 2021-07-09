const state = {
    numberOfPlayers: 2,
    // players: [
    //     {
    //         name: "Paweł",
    //         color: "red",
    //         pawns: [
    //             {type: "home", position: "red-1"},
    //             {type: "home", position: "red-2"},
    //             {type: "home", position: "red-3"},
    //             {type: "home", position: "red-4"},
    //         ]
    //     },
    //     {
    //         name: "Piotr",
    //         color: "blue",
    //         pawns: [
    //             {type: "home", position: "blue-1"},
    //             {type: "home", position: "blue-2"},
    //             {type: "home", position: "blue-3"},
    //             {type: "home", position: "blue-4"},
    //         ]           
    //     },
    //     {
    //         name: "Józef",
    //         color: "yellow",
    //         pawns: [
    //             {type: "home", position: "yellow-1"},
    //             {type: "home", position: "yellow-2"},
    //             {type: "home", position: "yellow-3"},
    //             {type: "home", position: "yellow-4"},
    //         ]
    //     },
    //     {
    //         name: "Witold",
    //         color: "green",
    //         pawns: [
    //             {type: "home", position: "green-1"},
    //             {type: "home", position: "green-2"},
    //             {type: "home", position: "green-3"},
    //             {type: "home", position: "green-4"},
    //         ]
    //     }
    // ],
    players: [],
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