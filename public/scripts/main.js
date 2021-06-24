import Modal from './modal.js';

const modal = Modal();

const checkButtons = document.querySelectorAll('.check');
const deleteButtons = document.querySelectorAll('.delete');
const cancelButton = document.querySelector('.cancel');


checkButtons.forEach(button => {
    button.addEventListener('click', e => modal.open());
});

deleteButtons.forEach(button => {
    button.addEventListener('click', e => modal.open());
});

cancelButton.addEventListener('click', modal.close);