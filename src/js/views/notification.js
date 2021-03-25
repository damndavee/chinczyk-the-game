import {DOM_ELEMENTS} from "../utils/base";
import { CLASSES } from "../utils/classes";

const {header} = DOM_ELEMENTS;

export function createNotification() {
    const notificationEl = document.createElement("div");
    notificationEl.classList.add(CLASSES.NOTIFICATION);
    notificationEl.setAttribute("id", "notification");
    header.appendChild(notificationEl);
}

export function displayNotification(msg, type) {
    const notification = document.querySelector("#header div#notification");
    notification.innerHTML = msg;
    notification.className = `notification translated ${type}`;
    
    setTimeout(() => {
        notification.className = "notification";
    }, 2500);
}