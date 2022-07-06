import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  initialCards,
  cardsContainer,
  nameInput,
  jobInput,
  formProfileEdit,
  placeFormElementAdd,
  profileEditBtn,
  imgBtnAdd,
  validationConfig,
} from "./constants.js";

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
const cardsSection = new Section(
  { items: initialCards, renderer: createCard },
  ".elements"
);
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

imgBtnAdd.addEventListener("click", () => addPlaceForm.open());

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
}

function handleAddPlaceFormSubmit({ name, link }) {
  const element = createCard({ name, link });

  cardsContainer.prepend(element);
  formAddValidator.resetValidation();
}

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
