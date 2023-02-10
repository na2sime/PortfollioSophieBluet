"use strict";

document.getElementById("projectsButton").addEventListener("click", function () {
    // Open the login.html page
    window.location.href = "index.html";
});

document.getElementById("contactButton").addEventListener("click", function () {
    // Open the index.html page then go to the contact side #contact
    window.location.href = "index.html#contact";
});

document.getElementById("connect").addEventListener("click", async function () {
    let login = "http://localhost:5678/api/users/login";
    // Get the email and password
    console.log("ze")
    let email = document.querySelector('input[type=email]').value.toString();
    let password = document.querySelector('input[type=password]').value.toString();
    // Check if the email and password are not empty
    console.log("Email: " + email + " Password: " + password);
    if (email !== "" && password !== "") {
        // Check if email is valid with regex
        let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
        if (regex.test(email)) {
            // Create the body
            let body = {
                email: email,
                password: password
            };
            console.log(body);
            // Send the request
            const response = await fetch(login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            })

            console.log("sended");
            if (response.status === 200) {
                console.log("Login successful");
                // Get the token
                response.json().then(data => {
                    localStorage.setItem("token", data.token);
                });
                // Go to the index.html page
                window.location.href = "index.html";
            } else {
                console.log("Login failed");
                // Display the error message
                displayMessage("Erreur de connection", "red");
            }
        } else {
            displayMessage("Email invalide", "red");
        }
    }
});

function displayMessage(message, color, time = 3000) {
    let messageA = document.getElementById("errorMessage");
    messageA.textContent = message;
    messageA.style.display = "block";
    setTimeout(function () {
        messageA.style.display = "none";
    }, time);
}