import { loadTemp } from "./renderer.js";

// My event listeners
let eventListeners = []

// General Variables
let isBana = false;
const pageView = document.getElementById("pageView");
const searchBtn = document.getElementById("searchBtn");
const urlInput = document.getElementById("pageUrlInput");

// Log error yeah
const logError = (error_msg) => {
    const errorElement = document.getElementById("errorLogEl");
    errorElement.innerHTML = error_msg;
};
// Unload the event listeners list
const unloadListeners = () => {
    eventListeners.map((con) => { con.abort() });
    eventListeners = [];
};
// Load home
const loadHome = async () => {
    try {
        const getHome = await fetch('./home.html');
        if (!getHome.ok) throw new Error("cannot get home.html content.");

        const getContent = await getHome.text();
        pageView.innerHTML = getContent

        // Refer to the element and start a controller
        const event1 = new AbortController();
    } catch (error) {
        pageView.innerHTML = `<p>${error}</p>`;
    }
}

// General purpose functions
function removeWinElement(element) {
    element.parentElement.parentElement.remove();
    console.log("Closed the window.");
}
function dumbAhhProfile() {
    const myName = document.getElementById("myName");
    isBana = !isBana;
    if (isBana) myName.innerHTML = "Banacount";
    else myName.innerHTML = "Johval";
}

// Making the function global 
window.removeWinElement = removeWinElement;
window.dumbAhhProfile = dumbAhhProfile;

loadHome();
searchBtn.addEventListener('click', () => {
    unloadListeners();
    loadTemp(`./${urlInput.value}.html`, (data) => {
        if (data != 1) {
            pageView.innerHTML = data;
            logError("");
        } else logError(`Cannot access ${urlInput.value} page`);
    });
})

/*
testing: if the event listener list works
document.addEventListener('keydown', (e) => {
    if (e.code == "KeyS") {
        console.log("test clear");
        eventListeners.map((con) => { con.abort() });
        eventListeners = [];
    }
});
*/
urlInput.value = "home";