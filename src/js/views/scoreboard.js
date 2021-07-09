import {insertHTML} from "../utils/functions";
import { DOM_ELEMENTS } from "../utils/base";
import state from "../utils/state";

export function loadScoreboard() {
    const scoreboard = `
    <div class="game__scoreboard" id="scoreboard">
        ${state.players.map(player => {
            return `<div class="game__player">
            <div class="game__player-index">${player.name}</div>
        </div>`
        }).join("")}
    </div>
    `;

    return scoreboard;
}

export function loadGameControls() {
    const gameControls = `
    <div class="game__controls">
        <div class="game__controls-left-side">
            <div class="game__controls-dice-container" id="dice-container"></div>
        </div>

        <div class="game__controls-right-side">
            <div class="game__controls-current-player">
                <p id="current-player">Current player: <span>Player</span></p>
            </div>
            <div class="game__controls-btn-container">
                <button class="game__controls-btn" id="dice-btn">Roll Dice</button>
            </div>
        </div>
    </div>
    `;

    return gameControls;
}

export function createScoreboard() {
    const scoreboard = `
    <div class="game__scoreboard" id="scoreboard">
        ${state.players.map((player, index) => {
            return `<div class="game__player" >
                        <div class="game__player-ribbon" style="background-color: ${player.color}"></div>
                        <div class="game__player-name">${player.name}</div>
                        <div class="game__player-pawns-container">
                            ${player.pawns.map(pawn => {
                                return `<div class="game__player-pawn"><i class="fas fa-chess-pawn" style="color: ${player.color}"></i> ${pawn.type}-${pawn.position.split("-")[1]}</div>`
                            }).join("")}
                        </div>
                    </div>`
        }).join("")}
    </div>

    <div class="game__controls">
        <div class="game__controls-left-side">
            <div class="game__controls-dice-container" id="dice-container">
                <!-- <div class="game__controls-dice fas fa-dice-one" id="dice"></div> -->
            </div>
        </div>

        <div class="game__controls-right-side">
            <div class="game__controls-current-player">
                <p id="current-player">Current player: <span style="background-color: ${state.activePlayer.color}">${state.activePlayer.name}</span></p>
            </div>
            <div class="game__controls-btn-container">
                <button class="game__controls-btn" id="dice-btn">Roll Dice</button>
            </div>
        </div>
    </div>
    `;

    insertHTML(DOM_ELEMENTS.gameActions, scoreboard);
}