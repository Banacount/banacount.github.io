import { loadTemp } from "./renderer.js";

// My event listeners
let eventListeners = []

// General Variables
let isBana = false;
let lastLocation = "home";
const pageView = document.getElementById("pageView");
const searchBtn = document.getElementById("searchBtn");
const urlInput = document.getElementById("pageUrlInput");

// Log error yeah
const logError = (error_msg) => {
    const errorElement = document.getElementById("errorLogEl");
    errorElement.innerHTML = error_msg;
};
// Load the temp html files but shorter lmao
const loadTempText = async (html_name_string) => {
    let didError = false;

    await loadTemp(html_name_string, (data) => {
        if (data != 1) {
            pageView.innerHTML = data;
            logError("");
        } else { 
            logError(`Cannot access ${urlInput.value} page`);
            didError = true;
        }

        lastLocation = html_name_string;
        urlInput.value = html_name_string;

        const url = new URL(window.location.href);
        url.searchParams.set('page', html_name_string);
        window.history.pushState({}, '', url);
    });

    return didError;
}

// Unload the event listeners list
const unloadListeners = () => {
    eventListeners.map((con) => { con.abort() });
    eventListeners = [];
};
// Literally just goes to a url
const urlGoerFromInput = () => {
    if (lastLocation == urlInput.value) {
        console.log("Don't refetch man, without chaging the location input.")
        return;  
    }

    unloadListeners();
    loadTempText(urlInput.value);
};
const urlGoerFromParam = async () => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get('page');

    if (page) 
    {
        unloadListeners();
        const didError = await loadTempText(page);

        if (didError) {
            loadTempText("404");
        }
    } else {
        unloadListeners();
        loadTempText("home");
    }

    return;
};

// General purpose functions
function removeWinElement(element) {
    element.parentElement.parentElement.remove();
    console.log("Closed the window.");
}
function dumbAhhProfile() {
    const myName = document.getElementById("myName");
    const profileImg = document.getElementById("profileImg");
    isBana = !isBana;
    if (isBana) {
        myName.innerHTML = "Banacount";
        profileImg.src = './ass/profile.png';
    } else {
        myName.innerHTML = "Johval";
        profileImg.src = './ass/me2.jpg';
    }
}
function gotoLocal(location) {
    urlInput.value = location;
    urlGoerFromInput();
}

// Making the function global 
window.removeWinElement = removeWinElement;
window.dumbAhhProfile = dumbAhhProfile;
window.gotoLocal = gotoLocal;

searchBtn.addEventListener('click', () => {
    urlGoerFromInput();
})

urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        urlGoerFromInput();
        urlInput.blur();
    }
});

// When the browser moves in history
window.addEventListener('popstate', () => {
    urlGoerFromParam();
});

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
urlGoerFromParam();
