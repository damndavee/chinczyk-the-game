export function createEmptyNotification() {
    const notification = document.createElement("div");
    notification.classList.add("popup");
}

export function notification() {
    notification.classList.add();
    notification.innerHtml = msg;
}