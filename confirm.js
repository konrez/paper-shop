const subtitle = document.querySelector(".subtitle");
const submit = document.querySelector(".submit");
const email = localStorage.getItem("registered_email");

const sendEmail = () => {
    if(!email) {
        return;
    } else {
        subtitle.innerHTML = `Wysłaliśmy właśnie do Ciebie link na adres: ${email}. Otwórz link aby móc dokończyć rejestrację i dokonać logowania`;
    }
};

sendEmail();

submit.addEventListener("click", () => {
    localStorage.removeItem("registered_email");
});

window.addEventListener("beforeunload", () => {
    localStorage.removeItem("registered_email");
});
