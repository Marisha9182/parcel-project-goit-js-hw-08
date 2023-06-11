import throttle from 'lodash.throttle';

const saveKey = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(saveKey)) || {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);

const { email, message } = form.elements;
reloadPage();

function storageFormData(e) {
    formData = { email: email.value, message: message.value };
    localStorage.setItem(saveKey, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();
    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value, message: message.value });

    localStorage.removeItem(saveKey);
    e.currentTarget.reset();
    formData = {};

    if (localStorage.getItem('feedback-form-state') !== null) {
        document.getElementById('email').value = formData.email;
        document.getElementById('message').value = formData.message;
    }
}

function reloadPage() {
    if (formData) {
    let { email, message } = form.elements;
    email.value = formData.email || '';
    message.value = formData.message || '';
    }
}
