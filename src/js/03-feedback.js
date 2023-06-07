import throttle from 'lodash.throttle';

const saveKey = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(saveKey)) || {};

form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);

// reloadPage();

function storageFormData(e) {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(saveKey, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();
    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value, message: message.value });
}

function reloadPage() {
    if (formData) {
    let { email, message } = form.elements;
    email.value = formData.email || '';
    message.value = formData.message || '';
    }
}
