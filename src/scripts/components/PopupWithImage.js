import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__img");
    this._titleElement = this._popup.querySelector(".popup__text");
  }

  open({ name, link }) {
    super.open();
    this._titleElement.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
  }
}
