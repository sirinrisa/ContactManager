const form = document.getElementById('contactForm');

const nameInput = document.getElementById('name');
const jobInput = document.getElementById('jobTitle');
const phoneInput = document.getElementById('phone');
const birthInput = document.getElementById('birthDate');

function setError(input, message) {
    const small = input.nextElementSibling;
    small.innerText = message;
    input.classList.add('input-error');
}

function clearError(input) {
    const small = input.nextElementSibling;
    small.innerText = '';
    input.classList.remove('input-error');
}

function isValidPhone(phone) {
    return /^\+375(25|29|33|44)\d{7}$/.test(phone);
}

form.addEventListener('submit', function (e) {
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
        setError(nameInput, "Name must be at least 2 characters");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    if (jobInput.value.trim().length < 2) {
        setError(jobInput, "Job title is required");
        isValid = false;
    } else {
        clearError(jobInput);
    }

    if (!isValidPhone(phoneInput.value)) {
        setError(phoneInput, "Use +375 (25/29/33/44) XXXXXXX");
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    if (!birthInput.value) {
        setError(birthInput, "Birth date is required");
        isValid = false;
    } else {
        const date = new Date(birthInput.value);
        if (date > new Date()) {
            setError(birthInput, "Birth date cannot be in future");
            isValid = false;
        } else {
            clearError(birthInput);
        }
    }

    if (!isValid) {
        e.preventDefault();
    }
});