"use strict";
let modalOpened = false;
let picture;

//On click on button who has class "editButton", open the modal
document.querySelectorAll(".editButton").forEach(function (button) {
    button.addEventListener("click", function () {
        showModal();
    });
});

document.addEventListener("click", function (e) {
    if ((e.target.id === "modal" && modalOpened === true) || e.target.id === "modal-close") {
        closeModal();
    } else if (e.target.id === "modal-add-first") {
        loadModalTwo();
    } else if (e.target.id === "modal_photoButton") {
        document.getElementById("modal_photoInput").click()
    }
});

document.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("modal_gallery__trash")) {
        let id = target.classList[3];
        console.log(id);
        deleteWork(id);
    }
});

function showPicture() {
    let photoBox = document.getElementById("modal_photoBox");
    photoBox.innerHTML = "";
    let img = document.createElement("img");
    img.id = "modal_add_photo";
    img.src = URL.createObjectURL(picture);
    img.style.alignSelf = "center";
    img.style.width = "180px";
    img.style.height = "185px";
    img.style.objectFit = "cover";
    photoBox.appendChild(img);
}


function showModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.getElementById("modal-back").style.display = "none";
    loadModalOne();
    modalOpened = true;
}

function loadModalOne() {
    let modalContent = document.getElementById("modal-content");

    let modalTitle = document.createElement("h2");
    modalTitle.textContent = "Galerie photo";
    modalTitle.classList.add("modal_dynamic__item");
    let gallery = document.createElement("div");
    gallery.id = "modal-gallery";
    gallery.classList.add("modal_dynamic__item");
    let modalHr = document.createElement("hr");
    modalHr.classList.add("modal_dynamic__item");
    let modalAdd = document.createElement("a");
    modalAdd.textContent = "Ajouter une photo";
    modalAdd.id = "modal-add-first";
    modalAdd.classList.add("modal_dynamic__item");
    let modalRemove = document.createElement("a");
    modalRemove.textContent = "Supprimer la gallerie";
    modalRemove.id = "modal-remove-first";
    modalRemove.classList.add("modal_dynamic__item");

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(gallery);
    modalContent.appendChild(modalHr);
    modalContent.appendChild(modalAdd);
    modalContent.appendChild(modalRemove);
    loadGallery();
}

function loadModalTwo() {
    let modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = "";

    let close = document.createElement("i");
    close.classList.add("fa-solid", "fa-xmark");
    close.id = "modal-close";
    let back = document.createElement("i");
    back.classList.add("fa-solid", "fa-arrow-left");
    back.id = "modal-back";

    let modalTitle = document.createElement("h2");
    modalTitle.textContent = "Ajout photo";
    modalTitle.classList.add("modal_dynamic__item");

    let photoBox = document.createElement("div");
    photoBox.classList.add("modal_dynamic__item");
    photoBox.id = "modal_photoBox";

    let photoIcon = document.createElement("i");
    photoIcon.classList.add("fa-regular", "fa-image", "modal_dynamic__item");

    let photoButton = document.createElement("button");
    photoButton.id = "modal_photoButton";
    photoButton.textContent = "+ Ajouter une photo";
    photoButton.classList.add("modal_dynamic__item");

    let photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.id = "modal_photoInput";
    photoInput.classList.add("modal_dynamic__item");

    let photoInfo = document.createElement("p");
    photoInfo.textContent = "jpg, png: 4mo max";
    photoInfo.classList.add("modal_dynamic__item");

    let photoInputLabel = document.createElement("label");
    photoInputLabel.id = "modal_photoInputLabel";
    photoInputLabel.classList.add("modal_dynamic__item");
    photoInputLabel.textContent = "Titre";
    photoInputLabel.setAttribute("for", "title");

    let titleInput = document.createElement("input");
    titleInput.id = "modal_titleInput";
    titleInput.classList.add("modal_dynamic__item");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.id = "modal_title_input";

    let selectorLabel = document.createElement("label");
    selectorLabel.classList.add("modal_dynamic__item");
    selectorLabel.textContent = "Catégorie";
    selectorLabel.setAttribute("for", "category");

    // Create a dropdown menu with 4 options (category)
    let selector = document.createElement("select");
    selector.classList.add("modal_dynamic__item");
    selector.name = "category";
    selector.id = "modal_category_selector";

    let option1 = document.createElement("option");
    option1.value = "2";
    option1.textContent = "Appartements";

    let option2 = document.createElement("option");
    option2.value = "3";
    option2.textContent = "Hotels & restaurants";

    let option3 = document.createElement("option");
    option3.value = "1";
    option3.textContent = "Objets";

    let br = document.createElement("div");
    br.id = "modal_br";
    br.classList.add("modal_dynamic__item");

    let addButton = document.createElement("button");
    addButton.id = "modal_addPhotoButton";
    addButton.textContent = "Valider";
    addButton.classList.add("modal_dynamic__item");

    selector.appendChild(option1);
    selector.appendChild(option2);
    selector.appendChild(option3);

    photoBox.appendChild(photoIcon);
    photoBox.appendChild(photoButton);
    photoBox.appendChild(photoInfo);

    modalContent.appendChild(close);
    modalContent.appendChild(back);

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(photoBox);
    modalContent.appendChild(photoInput);
    modalContent.appendChild(photoInputLabel);
    modalContent.appendChild(titleInput);
    modalContent.appendChild(selectorLabel);
    modalContent.appendChild(selector);
    modalContent.appendChild(br);
    modalContent.appendChild(addButton);

    photoInput.addEventListener("change", function () {
        const file = photoInput.files;
        picture = file[0];
        showPicture();
    });

    addButton.addEventListener("click", async function () {
        if (picture != null && titleInput.value !== "") {
            const response = await uploadImage(picture, titleInput.value, selector.value);
            if (response.status === 201) {
                console.log("Image uploadée");
                updateGallery();
                closeModal();
            } else {
                window.alert("Erreur lors de l'upload de l'image");
                console.log("Erreur lors de l'upload (status: " + response.status + ")");
            }
        } else {
            window.alert("Veuillez remplir tous les champs!");
        }
    });
}


function uploadImage(imageFile, title, category) {
    const url = 'http://localhost:5678/api/works';
    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    formData.append('title', title);
    formData.append('category', category);

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData
    });
}

function closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    let modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = "";
    let close = document.createElement("i");
    close.classList.add("fa-solid", "fa-xmark");
    close.id = "modal-close";
    let back = document.createElement("i");
    back.classList.add("fa-solid", "fa-arrow-left");
    back.id = "modal-back";

    modalContent.appendChild(close);
    modalContent.appendChild(back);
    modalOpened = false;
    picture = "";
}

function loadGallery() {
    fetch(works).then(response => response.json()).then(products => {
        let gallery = document.querySelector("#modal-gallery");
        for (let oneProduct of products) {
            let figureGallery = document.createElement("figure");
            let trash = document.createElement("i");
            let imgGallery = document.createElement("img");
            let figCaptionGallery = document.createElement("figcaption");

            trash.classList.add("fa-solid", "fa-trash-can", "modal_gallery__trash", oneProduct.id.toString());
            imgGallery.crossOrigin = "anonymous";
            imgGallery.src = oneProduct.imageUrl.toString();
            figCaptionGallery.textContent = "éditer";
            figureGallery.classList.add(oneProduct.id.toString());
            figureGallery.classList.add("modal_gallery__item");

            figureGallery.appendChild(trash);
            figureGallery.appendChild(imgGallery);
            figureGallery.appendChild(figCaptionGallery);

            gallery.appendChild(figureGallery);
        }
    });
}

async function deleteWork(id) {
    let request = "http://localhost:5678/api/works/";
    const response = await fetch(request + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    console.log("sended");
    console.log(response.status);
    if (response.status === 204) {
        console.log("Delete successful");
        closeModal();
        updateGallery();
    } else {
        console.log(response.status)
        console.log("Delete failed");
    }
}