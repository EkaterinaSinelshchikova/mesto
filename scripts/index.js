let ProfileEditBtn = document.querySelector('.profile__edit-button');
let Modalwindow = document.querySelector('.popup');
let ModalCloseWindow = document.querySelector('.popup__close-button');
let modalSaveWindow = document.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('#name-input');
let jobInput = formElement.querySelector('#job-input');

const profileName = document.querySelector('.profile__title'); 
const profileJob = document.querySelector('.profile__job');

function openModalWindow () {
    const name = profileName.textContent;
    const job = profileJob.textContent;

    nameInput.value = name;
    jobInput.value = job;

    Modalwindow.classList.add('popup__is-opened');
}

function closeModalWindow () {
    Modalwindow.classList.remove('popup__is-opened');  
}

ProfileEditBtn.addEventListener('click',openModalWindow);

ModalCloseWindow.addEventListener('click', closeModalWindow );

modalSaveWindow.addEventListener('click', closeModalWindow );



function formSubmitHandler (evt) {
    evt.preventDefault();

const name = nameInput.value;
const job = jobInput.value;



profileName.textContent = name;
profileJob.textContent = job;

}

formElement.addEventListener('submit', formSubmitHandler);