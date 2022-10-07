import "../pages/index.css";

import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithSubmit } from "../scripts/components/PopupWithSubmit.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api";
import {
  nameInput,
  aboutInput,
  formProfileEdit,
  placeFormElementAdd,
  profileEditBtn,
  imgBtnAdd,
  validationConfig,
  avatarEditForm,
} from "../scripts/constants.js";

const formAddValidator = new FormValidator(
  validationConfig,
  placeFormElementAdd
);

const formEditValidator = new FormValidator(validationConfig, formProfileEdit);

const formAvatarEditValidator = new FormValidator(
  validationConfig,
  avatarEditForm
);

const profileEditForm = new PopupWithForm(
  ".popup_type_edit-button",
  handleProfileFormSubmit
);

const popupImg = new PopupWithImage(".popup_type_image-preview");

const cardsSection = new Section(
  (item) => cardsSection.addItem(createCard(item)),
  ".elements"
);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  token: "5a68fdde-5fb9-43c7-accb-5d00338b1372",
});

const avatarEdit = new PopupWithForm(".popup-edit-avatar", handleAvatarEdit);
const avatarEditBtn = document.querySelector(".profile__avatar-edit-button");

const userInfo = new UserInfo({
  profileName: ".profile__title",
  profileAbout: ".profile__about",
  profileAvatar: ".profile__avatar",
});

const editPopup = new PopupWithForm(".popup_type_edit-button", handlePopupEdit);

function handlePopupEdit(data) {
  editPopup.setLoading(true);

  api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editPopup.setLoading(false);
      editPopup.close();
    });
}

const addPlaceForm = new PopupWithForm(".popup_type_add-button", (data) => {
  addPlaceForm.setLoading(true);

  api.addNewCard(data)
    .then((res) => {
      cardsSection.addItem(createCard(res), true);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addPlaceForm.setLoading(false);
      addPlaceForm.close();
    });
});

function handleAvatarEdit(data) {
  avatarEdit.setLoading(true);

  api.editAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarEdit.setLoading(false);
      avatarEdit.close();
    });
}

const deleteCardPopup = new PopupWithSubmit(".popup_delete");

function handleCardDelete(_evt, cardId) {
  deleteCardPopup.open();

  deleteCardPopup.setFormSubmit(() => {
    api.deleteCard(cardId)
      .then(() => {
        cardsSection.removeItem(document.getElementById(cardId));
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  });
}

deleteCardPopup.setEventListeners();
addPlaceForm.setEventListeners();
avatarEdit.setEventListeners();
editPopup.setEventListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarEditValidator.enableValidation();

addPlaceForm.setEventListeners();
profileEditForm.setEventListeners();
popupImg.setEventListeners();

avatarEditBtn.addEventListener("click", () => {
  formAvatarEditValidator.resetValidation();
  avatarEdit.open();
});

profileEditBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  aboutInput.value = about;
  profileEditForm.open();
});

imgBtnAdd.addEventListener("click", () => {
  formAddValidator.resetValidation();
  addPlaceForm.open();
});

function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
}

function createCard(cardData) {
  const card = new Card({
    selector: ".template-element",
    handleCardClick,
    addCardLike: api.addCardLike,
    deleteCardLike: api.deleteCardLike,
    handleCardDelete,
    userId: userInfo.getUserId(),
    ...cardData,
  });

  const element = card.prepareCard();
  return element;
}

function handleCardClick(values) {
  popupImg.open(values);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      about: userData.about,
      name: userData.name,
      _id: userData._id,
    });
    userInfo.setAvatar({ avatar: userData.avatar, name: userData.name });
    cardsSection.render(cards.reverse());
  })
  .catch((err) => console.log(err));
