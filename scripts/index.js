const profileEditBtn = document.querySelector(".profile__edit-button");
const modalWindow = document.querySelector(".popup_type_edit-button");
const modalCloseButton = document.querySelector(".popup__close-button");

const formElement = document.querySelector(".popup__content");
const nameInput = formElement.querySelector("#name-input");
const jobInput = formElement.querySelector("#job-input");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");

function openModalWindow() {
  const name = profileName.textContent;
  const job = profileJob.textContent;

  nameInput.value = name;
  jobInput.value = job;

  modalWindow.classList.add("popup__is-opened");
}

function closeModalWindow() {
  modalWindow.classList.remove("popup__is-opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closeModalWindow();
}

profileEditBtn.addEventListener("click", openModalWindow);
modalCloseButton.addEventListener("click", closeModalWindow);
formElement.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const template = document.querySelector(".template-element").content;
const elements = document.querySelector(".elements");

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("element__like-button_active");
};

const handleDelClick = (evt) => {
  evt.target.closest(".element").remove();
};

const previewImagePopup = document.querySelector(".popup_type_image-preview");
const popupImg = previewImagePopup.querySelector(".popup__img");
const popupText = previewImagePopup.querySelector(".popup__text");
const popupCloseBtn = previewImagePopup.querySelector("#preview-popup-close-button");

const handleImgClick = (evt) => {
  popupImg.src = evt.target.src;
  popupText.textContent = evt.target.alt;

  previewImagePopup.classList.add("popup__is-opened");
};

function closeImagePopup() {
  previewImagePopup.classList.remove("popup__is-opened");
}

popupCloseBtn.addEventListener("click", closeImagePopup);

const addCard = (name, link) => {
  const element = template.cloneNode(true);
  const elementImg = element.querySelector(".element__img");
  const elementTitle = element.querySelector(".element__title");
  const elementDelBtn = element.querySelector(".element__delete-button");
  const elementLikeBtn = element.querySelector(".element__like-button");

  elementImg.src = link;
  elementImg.alt = name;
  elementTitle.textContent = name;

  elementLikeBtn.addEventListener("click", handleLikeClick);
  elementDelBtn.addEventListener("click", handleDelClick);
  elementImg.addEventListener("click", handleImgClick);

  elements.append(element);
};

initialCards.forEach(({ name, link }) => {
  addCard(name, link);
});

const addImgBtn = document.querySelector(".profile__add-button");
const addWindow = document.querySelector(".popup_type_add-button");
const popupCloseButton = document.querySelector("#add-popup-close-button");
const addPlaceFormElement = document.querySelector("#add-place-form");
const placeInput = addPlaceFormElement.querySelector("#place-input");
const linkInput = addPlaceFormElement.querySelector("#link-input");

function openAddWindow() {
  addWindow.classList.add("popup__is-opened");
}

function closeAddWindow() {
  addWindow.classList.remove("popup__is-opened");
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();

  const placeInputElement = document.querySelector("#place-input");
  const linkInputElement = document.querySelector("#link-input");

  const name = placeInputElement.value;
  const link = linkInputElement.value;

  addCard(name, link);

  closeAddWindow();
}

addImgBtn.addEventListener("click", openAddWindow);
popupCloseButton.addEventListener("click", closeAddWindow);
addPlaceFormElement.addEventListener("submit", addPlaceFormSubmitHandler);
