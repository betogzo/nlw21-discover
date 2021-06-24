import Modal from './modal.js';

const modal = Modal();

const checkButtons = document.querySelectorAll('.check');
const deleteButtons = document.querySelectorAll('.delete');
const cancelButton = document.querySelector('.cancel');

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

cancelButton.addEventListener('click', modal.close);

checkButtons.forEach(button => {
    button.addEventListener('click', event => handleClick(event));
});

deleteButtons.forEach(button => {
    button.addEventListener('click', event => handleClick(event, false));
});

function handleClick(event, check = true) {
    event.preventDefault();

    const roomId = document.querySelector('#room-id').dataset.id;
    const form = document.querySelector('.modal form');
    const slug = check ? 'check' : 'delete';
    const questionId = event.target.dataset.id;

    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`);

    modalTitle.innerHTML = check ? 'Marcar como lida' : 'Excluir pergunta';
    modalDescription.innerHTML = check ? 'Deseja marcar esta pergunta como lida?' : 'Tem certeza que deseja excluir esta pergunta?';
    modalButton.innerHTML = check ? 'Marcar como lida' : 'Sim, excluir';
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red');
    modal.open();
}

