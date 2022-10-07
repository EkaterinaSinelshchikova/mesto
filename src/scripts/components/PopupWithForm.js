import { validationConfig } from "../constants.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._saveButton = this._popupForm.querySelector(
      `.${validationConfig.submitButtonSelector}`
    );
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _setInputValue(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];
    });
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
  };

  setLoading = (loading) => {
    this._saveButton.textContent = loading ? "Сохранение..." : "Сохранить";
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
