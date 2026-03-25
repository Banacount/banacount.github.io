console.log("What the helly!");
let closeBtns = document.querySelectorAll(".window-action button");

closeBtns.forEach((element) => {
    element.addEventListener('click', () => {
        console.log("Closed the window.");
        element.parentElement.parentElement.remove();
    })
})

let isBana = false;
const myName = document.getElementById("myName");
document.getElementById("myProfile").addEventListener('click', () => {
    isBana = !isBana;
    if (isBana) myName.innerHTML = "Banacount";
    else myName.innerHTML = "Johval";
})
