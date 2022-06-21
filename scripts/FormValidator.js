export class FormValidator {
  constructor(config, formSelector) {
    this._formSelectorSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;
  }

  _showInputError(inputConfig) {
    const { inputElement, errorMessage } = inputConfig;
    const form = document.querySelector(this._formSelector);
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const form = document.querySelector(this._formSelector);
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError({
        inputElement,
        errorMessage,
      });
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, saveButton) {
    if (this._hasInvalidInput(inputList)) {
      saveButton.classList.add(this._inactiveButtonClass);
      saveButton.disabled = true;
    } else {
      saveButton.classList.remove(this._inactiveButtonClass);
      saveButton.disabled = false;
    }
  }

  _setEventListeners() {
    const form = document.querySelector(this._formSelector);
    const inputList = Array.from(
      form.querySelectorAll(`.${this._inputSelector}`)
    );
    const buttonSave = form.querySelector(`.${this._submitButtonSelector}`);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonSave);
      });
    });
  }

  enableValidation() {
    const form = document.querySelector(this._formSelector);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    const form = document.querySelector(this._formSelector);
    const inputList = Array.from(
      form.querySelectorAll(`.${this._inputSelector}`)
    );
    const saveButton = form.querySelector(`.${this._submitButtonSelector}`);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList, saveButton);
  }
}
