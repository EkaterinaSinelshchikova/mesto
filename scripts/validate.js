const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (inputConfig) => {
  const {
    formElement,
    inputElement,
    errorMessage,
    inputErrorModifier,
    errorSelector,
  } = inputConfig;
  const errorElement = form.Element.querySelector(`.${inputElement.id}-error`);
  errorMessage.textContent = errorMessage;
  errorMessage.classList.add(errorSelector);
  inputElement.classList.add(inputErrorModifier);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorModifier,
  errorSelector
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorMessage.classList.remove(errorSelector);
  inputElement.classList.remove(inputErrorModifier);
  errorMessage.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorModifier,
  errorSelector
) => {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    showInputError({
      formElement,
      inputElement,
      errorMessage,
      inputErrorModifier,
      errorSelector,
    });
  } else {
    hideInputError(
      formElement,
      inputElement,
      inputErrorModifier,
      errorSelector
    );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList , saveButton , inactiveButtonClass) => {
if (hasInvalidInput (inputList)) {
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
} else {
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
}
};

const setEventListeners = (formElement , validConfig) => {
const {inputSelector , submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass} = validConfig;
const inputList = Array.from(formElement.querySelector(`.${inputSelector}`));
const saveButton = frameElement.querySelector(`.${submitButtonSelector}`);
inputList.forEach((formElement) => {
    inputElement.addEventListener('input' , () => {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, saveButton, inactiveButtonClass);
    });
});
toggleButtonState(inputList, saveButton, inactiveButtonClass);
};

const enableValidation = (validConfig) => {
    const {formSelector} = validConfig;
    const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit' , (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validConfig);
    });
};

enableValidation(config);