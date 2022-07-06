export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup__is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClosePopupOverlay = (evt) => {
    const { target, currentTarget } = evt;

    if (target === currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    const popupEditClose = this._popup.querySelector(".popup__close-button");
    popupEditClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", this._handleClosePopupOverlay);
  }
}
