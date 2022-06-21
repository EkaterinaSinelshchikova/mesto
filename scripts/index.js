import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-button");
const popupEditClose = document.querySelector(".popup__close-button");

const formProfileEdit = document.querySelector(".profile-edit-form");
const nameInput = formProfileEdit.querySelector("#name-input");
const jobInput = formProfileEdit.querySelector("#job-input");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");

const placeInputElement = document.querySelector("#place-input");
const linkInputElement = document.querySelector("#link-input");

const imgBtnAdd = document.querySelector(".profile__add-button");
const popupAddButton = document.querySelector(".popup_type_add-button");
const popupCloseButton = document.querySelector("#add-popup-close-button");
const placeFormElementAdd = document.querySelector(".add-place-form");

const formAddValidator = new FormValidator(
  {
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__save-button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  ".add-place-form"
);

const formEditValidator = new FormValidator(
  {
    formSelector: "popup__form",
    inputSelector: "popup__input",
    submitButtonSelector: "popup__save-button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  },
  ".profile-edit-form"
);

formAddValidator.enableValidation();
formEditValidator.enableValidation();

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__is-opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup__is-opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup__is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

function handleClosePopupOverlay(evt) {
  const { target, currentTarget } = evt;

  if (target === currentTarget) {
    closePopup(target);
  }
}

function openPopupEdit() {
  const name = profileName.textContent;
  const job = profileJob.textContent;

  nameInput.value = name;
  jobInput.value = job;

  formEditValidator.resetValidation();
  openPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(popupEdit);
}

profileEditBtn.addEventListener("click", openPopupEdit);
popupEditClose.addEventListener("click", () => closePopup(popupEdit));
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

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

export const previewImagePopup = document.querySelector(
  ".popup_type_image-preview"
);
const popupCloseImgPopup = previewImagePopup.querySelector(
  "#preview-popup-close-button"
);

popupCloseImgPopup.addEventListener("click", () =>
  closePopup(previewImagePopup)
);

initialCards.forEach(({ name, link }) => {
  const card = new Card({ name, link, selector: ".template-element" });
  const element = card.prepareCard();
  cardsContainer.append(element);
});

function openAddWindow() {
  formAddValidator.resetValidation();
  openPopup(popupAddButton);
}

function closeAddWindow() {
  closePopup(popupAddButton);
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();

  const name = placeInputElement.value;
  const link = linkInputElement.value;
  const card = new Card({ name, link, selector: ".template-element" });
  const element = card.prepareCard();

  cardsContainer.prepend(element);

  closeAddWindow();
}

imgBtnAdd.addEventListener("click", openAddWindow);
popupCloseButton.addEventListener("click", closeAddWindow);
placeFormElementAdd.addEventListener("submit", addPlaceFormSubmitHandler);
popupEdit.addEventListener("mousedown", handleClosePopupOverlay);
popupAddButton.addEventListener("mousedown", handleClosePopupOverlay);
previewImagePopup.addEventListener("mousedown", handleClosePopupOverlay);
