import {clearContainer, insertHTML, disableButton} from "../utils/functions";
import { DOM_ELEMENTS, getFilteredBoardFields } from "../utils/base";
import state from "../utils/state";

export function createScoreboard() {
    createAlertUI();
    createStatsUI();
    // createPlayerInfoUI();
}

function createAlertUI() {
    const defaultAlert = "Wykonaj rzut kostką...";

    const markup = `
        <div class="game__alert">
            <p class="alert" id="alert">${defaultAlert}</p>
        </div>
    `;

    insertHTML(DOM_ELEMENTS.gameActions, markup);
}

function createPlayerInfoUI() {
    const playerInfo = `
    <div class="game__scoreboard" id="scoreboard">
        ${state.players.map((player, index) => {
            return `<div class="game__player" >
            <div class="game__player-ribbon" style="background-color: ${player.color}"></div>
            <div class="game__player-name">${player.name}</div>
            <div class="game__player-pawns-container">
            ${player.pawns.map(pawn => {
                return `<div class="game__player-pawn"><i class="fas fa-chess-pawn" style="color: ${player.color}"></i> ${pawn.type}-${pawn.position.split("-")[1] ? pawn.position.split("-")[1] : pawn.position}</div>`
            }).join("")}
            </div>
            </div>`
        }).join("")}
    </div>
    `;

    insertHTML(DOM_ELEMENTS.gameActions, playerInfo);
}

function createStatsUI() {
    // console.log("active player dice rolls: ", state.activePlayer.diceRolls);
    // console.log("active player name: ", state.activePlayer.name);
    
    const stats = `
        <div class="game__controls" id="controls">
            <div class="game__controls-left">
                <div class="dice-container" id="dice-container">
                <div class="dice-container__dice fas fa-dice" id="dice" style="color: ${state.activePlayer.color};"></div>
                </div>
                <button class="dice-container__btn end-turn" id="dice-btn">Rzut Kostką</button>
            </div>

            <div class="game__controls-right" id="right-control">
                <div class="game__controls-current-player">
                    <p id="current-player">Obecnie tura gracza: <span style="background-color: ${state.activePlayer.color}">${state.activePlayer.name}</span></p>
                </div>
                <div class="game__controls-stats">
                    <div class="game__controls-stats-control">
                        <p class="game__controls-stats-number" id="stats-rolls" style="border-color: ${state.activePlayer.color};">
                            ${state.activePlayer.diceRolls}
                        </p>
                        <p class="game__controls-stats-name">rzuty kostką</p>
                    </div>
                    <div class="game__controls-stats-control">
                        <p class="game__controls-stats-number" style="border-color: ${state.activePlayer.color};">
                            ${state.activePlayer.basePawns}
                        </p>
                        <p class="game__controls-stats-name">Pionki w bazie</p>
                    </div>
                    <div class="game__controls-stats-control">
                        <p class="game__controls-stats-number" style="border-color: ${state.activePlayer.color};">
                            ${state.activePlayer.boardPawns}
                        </p>
                        <p class="game__controls-stats-name">pionki na planszy</p>
                    </div>
                    <div class="game__controls-stats-control">
                        <p class="game__controls-stats-number" style="border-color: ${state.activePlayer.color};">
                            ${state.activePlayer.homePawns}
                        </p>
                        <p class="game__controls-stats-name">pionki na mecie</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    insertHTML(DOM_ELEMENTS.gameActions, stats);
}

export function updateStatsUI() {
    document.querySelector("#stats-rolls").textContent = state.activePlayer.diceRolls;
}

export function resetGameUI() {
    const diceBtn = getFilteredBoardFields("rollBtn");
    disableButton(diceBtn, true);
    clearContainer(DOM_ELEMENTS.gameActions);
    
    createScoreboard();
}

export function updateAlertUI() {
    document.querySelector("#alert").innerHTML = "Wykonaj rzut kostką...";
}