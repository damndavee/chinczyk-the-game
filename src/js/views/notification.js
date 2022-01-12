import {DOM_ELEMENTS} from "../utils/base";
import { CLASSES } from "../utils/classes";

const {header} = DOM_ELEMENTS;

export function createNotificationContainer() {
    const notificationEl = document.createElement("div");
    notificationEl.classList.add(CLASSES.NOTIFICATION);
    notificationEl.setAttribute("id", "notification");
    header.appendChild(notificationEl);
}

// przebudowaćd displayNotifaction
// a) dodać możliwość wyświetlania notfyfikacji z gry -> gracz został zbity, brak możliwości ruchu po planszy
export function displayNotification(msg, type) {
    if(type === "success" || type === "error") {
        const notification = document.querySelector("#header div#notification");
        notification.innerHTML = msg;
        notification.className = `notification translated ${type}`;
        
        setTimeout(() => {
            notification.className = "notification";
        }, 2500);
    } else {
        const alertContainer = document.querySelector(".alert");
        alertContainer.innerHTML = msg;
    }
}