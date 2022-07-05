import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

import "../pages/index.css";

const formProfileEdit = document.querySelector(".profile-edit-form");
const placeFormElementAdd = document.querySelector(".add-place-form");
const profileEditBtn = document.querySelector(".profile__edit-button");
const imgBtnAdd = document.querySelector(".profile__add-button");
const validationConfig = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formAddValidator = new FormValidator(
  validationConfig,
  placeFormElementAdd
);

const nameInput = formProfileEdit.querySelector("#name-input");
const jobInput = formProfileEdit.querySelector("#job-input");
const formEditValidator = new FormValidator(validationConfig, formProfileEdit);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

const profileEditForm = new PopupWithForm(
  ".popup_type_edit-button",
  handleProfileFormSubmit
);

const userInfo = new UserInfo({
  profileName: ".profile__title",
  profileDescription: ".profile__job",
});

const addPlaceForm = new PopupWithForm(
  ".popup_type_add-button",
  handleAddPlaceFormSubmit
);

const popupImg = new PopupWithImage(".popup_type_image-preview");
const cardsSection = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);

addPlaceForm.setEventListeners();
profileEditForm.setEventListeners();
profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  profileEditForm.open();
});

imgBtnAdd.addEventListener("click", () => addPlaceForm.open());

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
}

function handleAddPlaceFormSubmit({ name, link }) {
  const element = createCard({ name, link });

  cardsContainer.prepend(element);
  formAddValidator.resetValidation();
}

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

const cardsContainer = document.querySelector(".elements");

initialCards.forEach(({ name, link }) => {
  const element = createCard({ name, link });
  cardsSection.addItem(element);
});

function createCard({ name, link }) {
  const card = new Card({
    name,
    link,
    selector: ".template-element",
    handleCardClick,
  });
  const element = card.prepareCard();
  return element;
}

function handleCardClick(values) {
  popupImg.open(values);
}
