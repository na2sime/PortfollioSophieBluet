"use strict";
let currentModal = null;

//On click on button who has class "editButton", open the modal
document.querySelectorAll(".editButton").forEach(function (button) {
    button.addEventListener("click", function () {
        showModal("modal-one");
        currentModal = "modal-one";
    });
});

document.querySelectorAll(".modal-close").forEach(function (button) {
    button.addEventListener("click", function () {
        closeModal(currentModal);
        currentModal = null;
    });
});

function showModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
}