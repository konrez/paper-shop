const BASE_URL = "https://ds-elp2-be.herokuapp.com"

const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const terms = document.getElementById("checkbox");

const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailAdressError");
const passwordError = document.querySelector("#passwordError");
const termsError = document.querySelector("#termsError");

const success = document.getElementById("success");
const failed = document.getElementById("failed");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validateRegisterForm()){
        const data = {
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value
        };
        register(data);
        localStorage.setItem("registered_email", email.value);
        
    } else {
        console.log('brak requestu - blad walidacji')
    }
});

function validateRegisterForm() {
    let proceed = {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        terms: true
    };

    const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
    const lastNameRegex = /^[A-Z][a-z]{1,19}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!firstNameRegex.test(firstName.value)){
        firstName.classList.add("error");
        firstNameError.classList.add("visible");
        proceed.firstName = false;
    } else {
        firstName.classList.remove("error");
        firstNameError.classList.remove("visible");
        proceed.firstName = true;
    };

    if(!lastNameRegex.test(lastName.value)){
        lastName.classList.add("error");
        lastNameError.classList.add("visible");
        proceed.lastName = false;
    } else {
        lastName.classList.remove("error");
        lastNameError.classList.remove("visible");
        proceed.lastName = true;
    };

    if(!emailRegex.test(email.value)){
        email.classList.add("error");
        emailError.classList.add("visible");
        proceed.email = false;
    } else {
        email.classList.remove("error");
        email.classList.remove("visible");
        proceed.email = true;
    };

    if(!passwordRegex.test(password.value)){
        password.classList.add("error");
        password.classList.add("visible");
        proceed.password = false;
    } else {
        password.classList.remove("error");
        password.classList.remove("visible");
        proceed.password = true;
    };

    if(!terms.checked) {
        terms.classList.add("visible");
        proceed.terms = false;
    } else {
        terms.classList.remove("visible");
        proceed.terms = true;
    };

    function shouldProceed(obj){
        for (let key in obj) {
            if(!proceed[key]){
                return false;
            }
        }
        return true;
    }
    return shouldProceed(proceed);
}

async function register(data) {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        if(response.status === 200 || 201) {
            const result = await response.json();
            handleSuccess();
        } else if (response.status === 403) {
            handleFailure("Taki uzytkownik juz istnieje, uzyj innego adresu email");
            return;
        }
    } catch (error) {
        handleFailure("Coś poszło nie tak");
        console.log("error", error);
    }
};

const handleSuccess = function() {
    const mainElement = document.querySelector("main")
    mainElement.classList.add("blur");
    popup.classList.add("showPopup");
    setTimeout(() => {
        mainElement.classList.remove("blur");
        popup.classList.remove("showPopup");
        success.classList.add("show");
        setTimeout(() => {
            success.classList.remove("show");
            window.location.href = "confirm.html";
        }, 1500)
    }, 1500)
};

const handleFailure = function(msg) {
    failed.innerHTML = msg;
    failed.classList.add("show");
    setTimeout(() => {
        failed.classList.remove("show");
    }, 1500)
};