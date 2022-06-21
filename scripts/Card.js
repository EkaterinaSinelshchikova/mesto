import { previewImagePopup, openPopup } from "./index.js";

export class Card {
  constructor(config) {
    this._name = config.name;
    this._link = config.link;
    this._selector = config.selector;
  }

  prepareCard() {
    const template = document.querySelector(this._selector).content;
    const element = template.cloneNode(true);
    const elementImg = element.querySelector(".element__img");
    const elementTitle = element.querySelector(".element__title");
    const elementDelBtn = element.querySelector(".element__delete-button");
    const elementLikeBtn = element.querySelector(".element__like-button");

    elementImg.src = this._link;
    elementImg.alt = this._name;
    elementTitle.textContent = this._name;

    elementLikeBtn.addEventListener("click", this._handleLikeClick);
    elementDelBtn.addEventListener("click", this._handleDelClick);
    elementImg.addEventListener("click", this._handleImgClick);

    return element;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _handleDelClick(evt) {
    evt.target.closest(".element").remove();
  }

  _handleImgClick(evt) {
    const popupImg = previewImagePopup.querySelector(".popup__img");
    const popupText = previewImagePopup.querySelector(".popup__text");

    popupImg.src = evt.target.src;
    popupText.textContent = evt.target.alt;
    popupImg.alt = evt.target.alt;

    openPopup(previewImagePopup);
  }
}
