document.addEventListener("DOMContentLoaded", loadAppointments);

function openForm(service) {
    document.getElementById("service").value = service;
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}

document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let service = document.getElementById("service").value;
    let date = document.getElementById("date").value;
    let terms = document.getElementById("terms").checked;

    let isValid = validateForm(name, email, phone, date, terms);
    if (!isValid) return;

    let appointment = { name, service, date, status: "Pending" };
    saveAppointment(appointment);

    showConfirmation(name, service, date);
    closeForm();
    loadAppointments();
});

function validateForm(name, email, phone, date, terms) {
    let valid = true;

    if (!name) {
        document.getElementById("nameError").innerText = "Name is required!";
        valid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format!";
        valid = false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById("phoneError").innerText = "Phone must be 10 digits!";
        valid = false;
    }

    if (new Date(date) <= new Date()) {
        document.getElementById("dateError").innerText = "Choose a future date!";
        valid = false;
    }

    if (!terms) {
        document.getElementById("termsError").innerText = "You must accept T&C!";
        valid = false;
    }

    return valid;
}

function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let table = document.querySelector("#appointmentTable tbody");
    table.innerHTML = "";

    appointments.forEach(a => {
        let row = `<tr>
            <td>${a.name}</td>
            <td>${a.service}</td>
            <td>${a.date}</td>
            <td>${a.status}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function showConfirmation(name, service, date) {
    document.getElementById("confirmation-message").innerText = `Thank you, ${name}! Your appointment for ${service} on ${date} is confirmed.`;
    document.getElementById("confirmation-popup").style.display = "block";
}

function closeConfirmation() {
    document.getElementById("confirmation-popup").style.display = "none";
}
