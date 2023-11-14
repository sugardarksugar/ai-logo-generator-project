const registerLink = document.querySelector(".links-to-register");
const loginLink = document.querySelector(".links-to-login");
const form = document.querySelector(".form-container");

registerLink.addEventListener("click", () => {
    form.classList.add("rotate");
});

loginLink.addEventListener("click", () => {
    form.classList.remove("rotate");
});

//register
document
    .querySelector("#register")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        // Serialize the Form afterwards
        const form = event.target;
        const formObject = {};

        formObject["username"] = form.username.value;
        formObject["password"] = form.password.value;

        const res = await fetch("/signup", {   //fetch to user.routes
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        const result = await res.json();
        console.log("result: ", result);

        if (result.error) {
            Swal.fire({
                title: result.error,
                backdrop: false
            })
        }

        else {
            // console.log("result");
            Swal.fire({
                title: result.message,
                backdrop: false
            })
        }
    });

//login
document
    .querySelector("#login")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        // Serialize the Form afterwards
        const form = event.target;
        const formObject = {};

        formObject["username"] = form.username.value;
        formObject["password"] = form.password.value;

        const res = await fetch("/signin", {   //fetch to user.routes
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        const result = await res.json();
        console.log("result: ", result);
        // function onSignIn(googleUser) {
        //   var profile = googleUser.getBasicProfile();
        //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //   console.log("Name: " + profile.getName());
        //   console.log("Image URL: " + profile.getImageUrl());
        //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
        // }

        if (!result.status) {
            Swal.fire({
                title: result.message,
                backdrop: false
            })
        } else {
            Swal.fire({
                title: result.message,
                backdrop: false
            })
            setTimeout(() => {
                location.href = !result.preference ? "preferenceSelection.html" : "homePage.html";
            }, "1000")
        }

        // else if (result.status && !result.preference) {
        //     Swal.fire({
        //         title: result.message,
        //         backdrop: false
        //     })
        //     setTimeout(() => {
        //         location.href = "preferenceSelection.html";
        //     }, "1000")
        // }

        // else if (result.status && result.preference) {
        //     Swal.fire({
        //         title: result.message,
        //         backdrop: false
        //     })
        //     setTimeout(() => {
        //         location.href = "homePage.html";
        //     }, "1000")
        // }

    });