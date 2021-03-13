import {DOM_ELEMENTS} from "../base";
import state from "../state";
import {clearInput, lightenDarkenColor, clearContainer, insertHTML} from "../utils/functions";
import Player from "./Player";

export default class Form {
    constructor() {
        this.playersContainer = DOM_ELEMENTS.playersContainer;
        this.playersFields = this.playersContainer.children;
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
        const field = `
            <div class="player" data-name="${name}">
            <div class="player__info">
                <span class="player__index">${index+1})</span>
                <span class="player__name">${name}</span>
            </div>
            <div class="player__actions">
                <div class="player__color" style="background-color: ${color}"></div>
                <div class="player__remove">
                    <button class="player__remove-btn">X</button>
                </div>
            </div>
        </div>
        `;

        insertHTML(this.playersContainer, field)
    }
    
    addPlayersToDOM() {
        const spreadPlayersFields = [...this.playersFields];
        for(let i = 0; i < spreadPlayersFields.length; i++) {
            spreadPlayersFields[i].remove();

            if(state.players[i] !== undefined) {
                const {name, color} = state.players[i];
                this.addPlayerField(i, name, color);
            }
        }
        this.counter = state.players.length;
    }

    deletePlayer(e) {
        const name = e.target.closest(".player").dataset.name
        console.log(name);
        e.target.closest(".player").remove();
        state.players = state.players.filter(i => i.name !== name)
        this.unlockButtons([...this.playersFields].length);
    }

    unlockButtons(value) {
        const playersColors = [];
        const buttonColors = this.colors;

        if(state.players.length > 0) {
            state.players = state.players.slice(0, +value);
            state.players.forEach(p => playersColors.push(p.color));
            this.addPlayersToDOM();
            
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
            alert("GAME HAS STARTED...");
        } else {   
            if(this.p_input.value && this.currentColor.dataset && playerExistance) {
                const chosenColor = this.colors.filter(col => col.dataset.color === this.currentColor.dataset.color)[0];
                const player = new Player(this.p_input.value, this.currentColor.dataset.color);

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
                //...
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
//7.a) header na wzór -> https://www.youtube.com/watch?v=EHYR_CD8zgo
//8. Poprawić dodawanie graczy (usuwa się "Player1:")
//9. Stworzyć error.js -> views = możliwość wyświetlania customowych alertów
//10. Stworzyć popup.js -> views = możliwośc wyświetlania powiadomień np "wybrano kolor: `zielony`"
//11. upgrade error handlderów (beznadziejnie wygląda kod = można go zoptymalizować)
//12. Gdy osiągnie się zadeklarowaną liczbę graczy -> zablokować input (dodawanie gracza);

//BUGI
// 1. Height "player__color" nie jest w rzeczywistości 100%;