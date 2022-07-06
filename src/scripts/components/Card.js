import { openPopup } from "../index.js";

const previewImagePopup = document.querySelector(".popup_type_image-preview");
const popupImg = previewImagePopup.querySelector(".popup__img");
const popupText = previewImagePopup.querySelector(".popup__text");

export class Card {
  constructor(config) {
    this._name = config.name;
    this._link = config.link;
    this._selector = config.selector;
    this._element = document
      .querySelector(config.selector)
      .content.cloneNode(true);
    this._elementImg = this._element.querySelector(".element__img");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementDelBtn = this._element.querySelector(
      ".element__delete-button"
    );
    this._elementLikeBtn = this._element.querySelector(".element__like-button");
    this._handleCardClick = config.handleCardClick;
  }

  prepareCard() {
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementLikeBtn.addEventListener("click", this._handleLikeClick);
    this._elementDelBtn.addEventListener("click", this._handleDelClick);
    this._elementImg.addEventListener("click", this._handleCardElementClick);
  }

  _handleCardElementClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle("element__like-button_active");
  };

  _handleDelClick = (evt) => {
    evt.target.closest(".element").remove();
  };
}
