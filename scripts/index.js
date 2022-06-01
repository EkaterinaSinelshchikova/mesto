const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit-button");
const popupEditClose = document.querySelector(".popup__close-button");

const formProfileEdit = document.querySelector(".popup__content");
const nameInput = formProfileEdit.querySelector("#name-input");
const jobInput = formProfileEdit.querySelector("#job-input");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");

const buttonSave = document.querySelector(".popup__save-button");

const placeInputElement = document.querySelector("#place-input");
const linkInputElement = document.querySelector("#link-input");

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__is-opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
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

  resetValidation();
  openPopup(popupEdit);
}

  closePopup(popupEdit);


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

const template = document.querySelector(".template-element").content;
const cardsContainer = document.querySelector(".elements");

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("element__like-button_active");
};

const handleDelClick = (evt) => {
  evt.target.closest(".element").remove();
};

const previewImagePopup = document.querySelector(".popup_type_image-preview");
const popupImg = previewImagePopup.querySelector(".popup__img");
const popupText = previewImagePopup.querySelector(".popup__text");
const popupCloseImgPopup = previewImagePopup.querySelector(
  "#preview-popup-close-button"
);


const handleImgClick = (evt) => {
  popupImg.src = evt.target.src;
  popupText.textContent = evt.target.alt;
  popupImg.alt = evt.target.alt;

  openPopup(previewImagePopup);
};

  closePopup(previewImagePopup);

popupCloseImgPopup.addEventListener("click", () => closePopup(previewImagePopup));

const prepareCard = (name, link) => {
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

  return element;
};

initialCards.forEach(({ name, link }) => {
  const element = prepareCard(name, link);
  cardsContainer.append(element);
});

const imgBtnAdd = document.querySelector(".profile__add-button");
const popupAddButton = document.querySelector(".popup_type_add-button");
const popupCloseButton = document.querySelector("#add-popup-close-button");
const placeFormElementAdd = document.querySelector("#add-place-form");
const placeInput = placeFormElementAdd.querySelector("#place-input");
const linkInput = placeFormElementAdd.querySelector("#link-input");


function openAddWindow() {
  resetValidation();
  openPopup(popupAddButton);
}

function closeAddWindow() {
  closePopup(popupAddButton);
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();

  const name = placeInputElement.value;
  const link = linkInputElement.value;
  const element = prepareCard(name, link);

  cardsContainer.prepend(element);

  closeAddWindow();

  placeFormElementAdd.reset();
}

imgBtnAdd.addEventListener("click", openAddWindow);
popupCloseButton.addEventListener("click", closeAddWindow);
placeFormElementAdd.addEventListener("submit", addPlaceFormSubmitHandler);
popupEdit.addEventListener("mousedown", handleClosePopupOverlay);
popupAddButton.addEventListener("mousedown", handleClosePopupOverlay);
previewImagePopup.addEventListener("mousedown", handleClosePopupOverlay);
