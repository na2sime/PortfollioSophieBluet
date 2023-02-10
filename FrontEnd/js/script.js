"use strict";
let works = "http://localhost:5678/api/works";

document.getElementById("loginButton").addEventListener("click", function () {
    // Open the login.html page
    window.location.href = "login.html";
});

document.getElementById("contactButton").addEventListener("click", function () {
    // Go to the contact side
    window.location.href = "#contact";
});

resteAllButton();

loadWorks();
function loadWorks() {
    fetch(works).then(response => response.json()).then(products => {
        let gallery = document.querySelector(".gallery");
        for (let oneProduct of products) {
            let figureGallery = document.createElement("figure");
            let imgGallery = document.createElement("img");
            let figCaptionGallery = document.createElement("figcaption");

            imgGallery.crossOrigin = "anonymous";
            imgGallery.src = oneProduct.imageUrl.toString();
            figCaptionGallery.textContent = oneProduct.title;
            figureGallery.classList.add(oneProduct.category.id.toString());
            figureGallery.classList.add("gallery__item");

            figureGallery.appendChild(imgGallery);
            figureGallery.appendChild(figCaptionGallery);

            gallery.appendChild(figureGallery);
        }
    });
}

document.getElementById("loginButton").addEventListener("click", function () {
    if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
});

if (localStorage.getItem("token") !== null) {
    document.getElementById("loginButton").textContent = "logout";
    for (let i = 0; i < document.getElementsByClassName("editButton").length; i++) {
        document.getElementsByClassName("editButton")[i].style.display = "block";
    }
}

function resteAllButton() {
    document.getElementById("0").style.color = "white";
    document.getElementById("0").style.backgroundColor = "#1D6154";
}

function resetOtherButtons(id) {
    for (let i = 1; i < 4; i++) {
        if (i !== id) {
            document.getElementById(i).style.color = "#1D6154";
            document.getElementById(i).style.backgroundColor = "white";
        }
    }
}

function resetGallery() {
    // Get all figures
    let figures = document.querySelectorAll("figure");
    resetOtherButtons(0)
    resteAllButton();
    for (let figure of figures) {
        // Set display to block
        figure.style.display = "block";
    }
}

function filterGallery(id) {
    // Get all figures
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.backgroundColor = "#1D6154";
    document.getElementById("0").style.color = "#1D6154";
    document.getElementById("0").style.backgroundColor = "white";
    resetOtherButtons(id);
    let figures = document.querySelectorAll("figure");
    for (let figure of figures) {
        if (figure.classList.contains("gallery__item")) {
            // Check if the figure has the same id
            if (figure.classList.contains(id)) {
                // Set display to block to show the figure
                figure.style.display = "block";
            } else {
                // Set display too none to remove them from the gallery
                figure.style.display = "none";
            }
        }
    }
}

function updateGallery() {
    resetGallery();
    // Get all figures and remove them
    let figures = document.querySelectorAll("figure");
    for (let figure of figures) {
        figure.remove();
    }
    loadWorks();
}