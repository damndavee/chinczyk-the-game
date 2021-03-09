import {DOM_ELEMENTS} from "../base";
import state from "../state";
import {clearInput, errorHandler, lightenDarkenColor, clearContainer} from "../utils/functions";
// import {changeTextButton, addPlayerField, addPlayersToDOM} from "../views/form";
import Player from "./Player";

export default class Form {
    constructor() {
        this.p_fields = [...DOM_ELEMENTS.playersNamefields];
        this.p_input = DOM_ELEMENTS.playerNameInput;
        this.colors = [...DOM_ELEMENTS.colorPickerButtons];
        this.startGameBtn = DOM_ELEMENTS.startGameBtn;
        this.counter = 0;
        this.currentColor = "";
    }

    setColor(color, e) {
        e.preventDefault();
        this.currentColor = color;
        this.colors.forEach(color => color.classList.remove("selected"));
        color.classList.add("selected");
    }

    changeTextButton() {
        if(state.players.length === state.numberOfPlayers) {
            this.startGameBtn.textContent = "Start Game!";
        } else {
            this.startGameBtn.textContent = "Add Player";
        }
    }
    
    changeHoverColor(flag, color) {
        // flag bascially tells us if the event listener is wheter "mouseover" or "mouseout"
        const hexColorBox = color.dataset.hex.toUpperCase();
    
        switch (flag) {
            case "enter": {
                color.style.backgroundColor = `#${lightenDarkenColor(hexColorBox, 90)}`;
                break;
            }
            case "out": {
                color.style.backgroundColor = color.dataset.color;
                break;
            }        
            default: {
                color.style.backgroundColor = "black";
                break;
            }
        }
    }
    
    addPlayerField(index, name, color) {
        const nameSpan = document.createElement("span");
        const colorSpan = document.createElement("span");
    
        colorSpan.classList.add("colored-box");
        colorSpan.style.backgroundColor = color;
    
        nameSpan.innerHTML = name;
        
        this.p_fields[index].appendChild(nameSpan);
        this.p_fields[index].appendChild(colorSpan);
    }
    
    addDummyPlayerField(index) {
        const dummyPlayer = document.createElement("b");
    
        dummyPlayer.innerHTML = `Player ${index+1}:`;
    
        this.p_fields[index].appendChild(dummyPlayer);
    }
    
    addPlayersToDOM() {
        for(let i = 0; i < this.p_fields.length; i++) {
            clearContainer(this.p_fields[i]);
    
            if(state.players[i] !== undefined) {
                const {name, color} = state.players[i];
                this.addPlayerField(i, name, color);
            } else {
                this.addDummyPlayerField(i);
            }
        }
        this.counter = state.players.length;
    }

    unlockButtons(value) {
        const playersColors = [];
        const buttonColors = this.colors;

        if(state.players.length > 0) {
            state.players = state.players.slice(0, +value);
            state.players.forEach(p => playersColors.push(p.color));
            this.addPlayersToDOM(this.counter);
            
            //bc - button color
            //fbc - filter button color
            buttonColors.filter(bc => !playersColors.includes(bc.dataset.color)).forEach(fbc => {
                if(fbc.disabled) {
                    fbc.disabled = false;
                    fbc.classList.remove("disabled");
                }
            })
        }
    }

    changeAmountOfPlayers(value) {
        state.numberOfPlayers = +value;
        this.unlockButtons(value);
        this.changeTextButton(state);
    }

    submitForm(e) {
        e.preventDefault();
        const extractedPlayersNames = state.players.map(p => p.name);
        const playerExistance = !extractedPlayersNames.includes(this.p_input.value);

    
        if(state.players.length === state.numberOfPlayers) {
            //2. usunać templatkę z formularzem
            //3. przełączyć na planszę do gry
            alert("GAME HAS STARTED...");
        } else {   
            if(this.p_input.value && this.currentColor.dataset && playerExistance) {
                const chosenColor = this.colors.filter(col => col.dataset.color === this.currentColor.dataset.color)[0];
                const player = new Player(this.p_input.value.toLowerCase(), this.currentColor.dataset.color);

                this.addPlayerField(this.counter, this.p_input.value, this.currentColor.dataset.color);
    
                chosenColor.classList.add("disabled");
                chosenColor.classList.remove("selected");
                chosenColor.disabled = true;
    
                player.addPlayerToState();
                clearInput(this.p_input);
    
                this.currentColor = "";
                this.counter++;
                this.changeTextButton();
            } else {
                alert(errorHandler(this.p_input.value, this.currentColor.dataset, playerExistance));
            }
        }
    }
}

//TODO & REFACTORING
//1. Pozbyć się modelu Form (nie jest potrzebny - cały constructor można albo przenieść do state'u, albo usunąć)
//2. Utworzyć plik form.js -> controller = będzie on posiadał większość logiki z modelu
//3. Przenieść niektóre metody do form.js -> views
//4. przenieść funkcjonalności z submit do osobnych metod
//5. stworzyć plik z klasami, które dodaje dynamicznie poprzez js w tym pliku!
//6. drobne poprawki wizualne (np placeholder przechodzi nad input)
//7. Poprawić wygląd formularza (film z yt: https://www.youtube.com/watch?v=VnvzxGWiK54)
//8. Poprawić dodawanie graczy (usuwa się "Player1:")
//9. Stworzyć error.js -> views = możliwość wyświetlania customowych alertów
//10. upgrade error handlderów (beznadziejnie wygląda kod = można go zoptymalizować)
//11. Gdy osiągnie się zadeklarowaną liczbę graczy -> zablokować input (dodawanie gracza);