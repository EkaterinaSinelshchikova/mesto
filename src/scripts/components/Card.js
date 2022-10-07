const isLikedByUser = (likesArray, userId) => {
  for (let like in likesArray) {
    if (like._id == userId) {
      return true;
    }
  }
  return false;
};

export class Card {
  constructor(config) {
    this._name = config.name;
    this._link = config.link;
    this._selector = config.selector;
    this._element = document
      .querySelector(config.selector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._elementImg = this._element.querySelector(".element__img");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementDelBtn = this._element.querySelector(
      ".element__delete-button"
    );
    this._elementLikeBtn = this._element.querySelector(".element__like-button");
    this._handleCardClick = config.handleCardClick;
    this._handleCardDelete = config.handleCardDelete;
    this._owner = config.owner;
    this._userId = config.userId;
    this._cardId = config._id;
    this._handleLike = config.handleLike;
    this._likes = config.likes || [];
    this._isLiked = isLikedByUser(this._likes, this._userId);
    this._addCardLike = config.addCardLike;
    this._deleteCardLike = config.deleteCardLike;
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._likeCounter.textContent = this._likes.length;

    this._element.id = this._cardId;

    if (this._userId !== this._owner._id) {
      this._elementDelBtn.style.display = "none";
    }
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
    this._elementDelBtn.addEventListener("click", this._handleCardDeleteClick);
    this._elementImg.addEventListener("click", this._handleCardElementClick);
  }

  _handleCardElementClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _handleCardDeleteClick = (event) => {
    this._handleCardDelete(event, this._cardId);
  };

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle("element__like-button_active");
    if (
      !this._elementLikeBtn.classList.contains("elements__like-button_active")
    ) {
      this._addCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._elementLikeBtn.classList.add("heartbeat");
          this._elementLikeBtn.classList.add("elements__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._elementLikeBtn.classList.remove("heartbeat");
          this._elementLikeBtn.classList.remove("elements__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  };
}
