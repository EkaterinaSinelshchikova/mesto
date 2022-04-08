const profileEditBtn = document.querySelector(".profile__edit-button");
const modalWindow = document.querySelector(".popup");
const modalCloseWindow = document.querySelector(".popup__close-button");

const formElement = document.querySelector(".popup__content");
const nameInput = formElement.querySelector("#name-input");
const jobInput = formElement.querySelector("#job-input");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");

function openModalWindow() {
  const name = profileName.textContent;
  const job = profileJob.textContent;

  nameInput.value = name;
  jobInput.value = job;

  modalWindow.classList.add("popup__is-opened");
}

function closeModalWindow() {
  modalWindow.classList.remove("popup__is-opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closeModalWindow();
}

profileEditBtn.addEventListener("click", openModalWindow);
modalCloseWindow.addEventListener("click", closeModalWindow);
formElement.addEventListener("submit", formSubmitHandler);
