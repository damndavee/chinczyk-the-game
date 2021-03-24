const state = {
    numberOfPlayers: 2,
    players: [{name: "Paweł", color: "red", pawns: [
        {type: "home", position: "red-1"}, 
        {type: "home", position: "red-2"}, 
        {type: "home", position: "red-3"}, 
        {type: "home", position: "red-4"}
    ]},
    {name: "Piotr", color: "green", pawns: [
        {type: "home", position: "green-1"}, 
        {type: "home", position: "green-2"}, 
        {type: "home", position: "green-3"}, 
        {type: "home", position: "green-4"}
    ]}],
    // players: [],
    pickedColor: '',
}

export default state;