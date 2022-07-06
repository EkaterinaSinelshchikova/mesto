import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import {
  initialCards,
  nameInput,
  jobInput,
  formProfileEdit,
  placeFormElementAdd,
  profileEditBtn,
  imgBtnAdd,
  validationConfig,
} from "../scripts/constants.js";

import "../pages/index.css";

const formAddValidator = new FormValidator(
  validationConfig,
  placeFormElementAdd
);

const formEditValidator = new FormValidator(validationConfig, formProfileEdit);

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
const cardsSection = new Section(createCard, ".elements");
formAddValidator.enableValidation();
formEditValidator.enableValidation();

addPlaceForm.setEventListeners();
profileEditForm.setEventListeners();
popupImg.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  profileEditForm.open();
});

imgBtnAdd.addEventListener("click", () => {
  formAddValidator.resetValidation();
  addPlaceForm.open();
});

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
}

function handleAddPlaceFormSubmit(card) {
  const element = cardsSection.render(card);

  cardsSection.addItem(element);
  formAddValidator.resetValidation();
}

initialCards.forEach((card) => {
  const element = cardsSection.render(card);
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
