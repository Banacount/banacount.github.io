
// General Variables
let eventListeners = []

// Load home
let isBana = false;
const pageView = document.getElementById("pageView");
const loadHome = async () => {
    try {
        const getHome = await fetch('./home.html');
        if (!getHome.ok) throw new Error("cannot get home.html content.");

        const getContent = await getHome.text();
        pageView.innerHTML = getContent

        // Refer to the element and start a controller
        const myName = document.getElementById("myName");
        const event1 = new AbortController();

        // Start the listener
        document.getElementById("myProfile").addEventListener('click', () => {
            isBana = !isBana;
            if (isBana) myName.innerHTML = "Banacount";
            else myName.innerHTML = "Johval";
        }, { 'signal': event1.signal });
        // Push the controller on the array so we could get rid of it later
        eventListeners.push(event1);

        // Window thingys
        let closeBtns = document.querySelectorAll(".window-action button");
        closeBtns.forEach((element) => {
            const controller = new AbortController();
            element.addEventListener('click', () => {
                console.log("Closed the window.");
                element.parentElement.parentElement.remove();
            }, { 'signal': controller.signal })

            eventListeners.push(controller);
        })

    } catch (error) {
        pageView.innerHTML = `<p>${error}</p>`;
    }
}

loadHome();
/*
document.addEventListener('keydown', (e) => {
    if (e.code == "KeyS") {
        console.log("test clear");
        eventListeners.map((con) => { con.abort() });
        eventListeners = [];
    }
});
*/
