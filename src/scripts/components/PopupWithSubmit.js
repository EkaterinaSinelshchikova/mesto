import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setFormSubmit(formSubmit) {
    this._formSubmit = formSubmit;

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit();
    });
  }

  setEventListeners = () => {
    super.setEventListeners();
  };
}
