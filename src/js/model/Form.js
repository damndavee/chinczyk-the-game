import {DOM_ELEMENTS} from "../base";
import state from "../state";
import {clearContainer, clearInput} from "../utils/functions";
import Player from "./Player";
import * as formView from "../views/form";
import * as notificationController from "../controller/notification";
import * as notificationView from "../views/notification";

export default class Form {
    constructor() {
        this.playersFields = DOM_ELEMENTS.playersContainer.children;
        this.p_input = DOM_ELEMENTS.playerNameInput;
        this.colors = [...DOM_ELEMENTS.colorPickerButtons];
        this.counter = 0;
        this.currentColor = "";
    }

    setColor(color, e) {
        e.preventDefault();
        this.currentColor = color;
        this.colors.forEach(color => color.classList.remove("selected"));
        color.classList.add("selected");
    }

    //generateDomPlayers
    addPlayersToDOM() {
        const spreadPlayersFields = [...this.playersFields];
        for(let i = 0; i < spreadPlayersFields.length; i++) {
            spreadPlayersFields[i].remove();

            if(state.players[i] !== undefined) {
                const {name, color} = state.players[i];
                formView.addPlayerField(i, name, color);
            }
        }
        this.counter = state.players.length;
    }

    deletePlayer(e) {
        const name = e.target.closest(".player").dataset.name;
        const success = notificationController.successHandler("playerRemoved");
        e.target.closest(".player").remove();
        state.players = state.players.filter(i => i.name !== name);
        this.unlockButtons([...this.playersFields].length);
        notificationView.displayNotification(success, "success");
        formView.changeTextButton();
    }

    //unlockButtonsAnd... (invent new name)
    unlockButtons(value) {
        const playersColors = [];
        const buttonColors = this.colors;

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

    // unlockButtons() {
        
    // }

    // updatePlayersListDOM() {

    // }

    //rozbić na 2 metody. Jedna zmienia ilość graczy, druga manipuluje DOMem
    changeAmountOfPlayers(value) {
        //1
        state.numberOfPlayers = +value;
        //2
        this.unlockButtons(value);
        formView.changeTextButton();
    }

    submitForm(e) {
        e.preventDefault();
        const extractedPlayersNames = state.players.map(p => p.name);
        const playerExistance = !extractedPlayersNames.includes(this.p_input.value);

        const player = {
            name: this.p_input.value,
            color: this.currentColor === "" ? undefined : this.currentColor.dataset.color,
            existance: playerExistance
        }
        
        const error = notificationController.errorHandler(player);
        const success = notificationController.successHandler("playerAdded");
        
        // reverse the condition
        if(state.players.length === state.numberOfPlayers) {
            clearContainer();
        } else {   
            if(error.flag) {
                notificationView.displayNotification(error.msg, "error");
            } else {
                const chosenColor = this.colors.filter(col => col.dataset.color === this.currentColor.dataset.color)[0];
                const player = new Player(this.p_input.value, this.currentColor.dataset.color);
    
                formView.addPlayerField(this.counter, this.p_input.value, this.currentColor.dataset.color);
    
                chosenColor.classList.add("disabled");
                chosenColor.classList.remove("selected");
                chosenColor.disabled = true;
    
                player.addPlayerToState();
                notificationView.displayNotification(success, "success");
    
                clearInput(this.p_input);
    
                this.currentColor = "";
                this.counter++;
                formView.changeTextButton();
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
//6. drobne poprawki wizualne (np placeholder przechodzi nad input)"
//7. upgrade error handlderów (beznadziejnie wygląda kod = można go zoptymalizować)
//8. Gdy osiągnie się zadeklarowaną liczbę graczy -> zablokować input (dodawanie gracza);
//9. Dodać możliwość edycji nazwy gracza

//BUGI
// 1. Height "player__color" nie jest w rzeczywistości 100%;
// 2. Przechodzi "błąd", gdy nazwa gracza ma mniej niż 4 znaki lub więcej niż 10
// 3. Przy "wystarczającej" ilości graczy, gdy wciskamy "Start Game" dalej się uruchamia error handler