const config = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (inputConfig) => {
  const {
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorSelector,
  } = inputConfig;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSelector);
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorSelector
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(errorSelector);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorSelector
) => {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    showInputError({
      formElement,
      inputElement,
      errorMessage,
      inputErrorClass,
      errorSelector,
    });
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorSelector);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, saveButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
  } else {
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
  }
};

const setEventListeners = (formElement, validConfig) => {
  const {
    inputSelector,
    submitButtonSelector,
    errorClass,
    inputErrorClass,
    inactiveButtonClass,
  } = validConfig;
  const inputList = Array.from(
    formElement.querySelectorAll(`.${inputSelector}`)
  );
  const buttonSave = formElement.querySelector(`.${submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonSave, inactiveButtonClass);
    });
  });
};

const enableValidation = (validConfig) => {
  const { formSelector } = validConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validConfig);
  });
};

function resetValidation() {
  const {
    inputSelector,
    inputErrorClass,
    inactiveButtonClass,
    formSelector,
    errorSelector,
    submitButtonSelector,
  } = config;

  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(`.${inputSelector}`)
    );
    const saveButton = formElement.querySelector(`.${submitButtonSelector}`);

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, inputErrorClass, errorSelector);
    });

    toggleButtonState(inputList, saveButton, inactiveButtonClass);
  });
}

enableValidation(config);
