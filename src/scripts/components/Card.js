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
    this._isLiked = this._isLikedByUser(this._likes, this._userId);
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

    if (this._isLiked) {
      this._elementLikeBtn.classList.add("element__like-button_active");
    }

    this._setEventListeners();

    return this._element;
  }

  _isLikedByUser = (likesArray, userId) => {
    return !!likesArray.find((like) => like._id === userId);
  };

  _setEventListeners() {
    this._elementLikeBtn.addEventListener("click", this._handleLikeClick);
    this._elementDelBtn.addEventListener("click", this._handleCardDeleteClick);
    this._elementImg.addEventListener("click", this._handleCardElementClick);
  }

  _handleCardElementClick = () => {
    this._handleCardClick({ name: this._name, link: this._link });
  };

  _handleCardDeleteClick = (evt) => {
    this._handleCardDelete(evt, this._cardId);
  };

  _handleLikeClick = (evt) => {
    if (
      !this._elementLikeBtn.classList.contains("element__like-button_active")
    ) {
      this._addCardLike(this._cardId)
        .then((res) => {
          evt.target.classList.toggle("element__like-button_active");
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._elementLikeBtn.classList.remove("element__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  };
}
