export class Api {
  constructor(config) {
    this._url = config.url;
    this._token = config.token;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  };

  getInitialCards = () => {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  };

  editAvatar = (data) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  };

  editProfile = (data) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._requestResult(res));
  };

  addNewCard = (data) => {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  };

  deleteCard = (data) => {
    return fetch(`${this._url}/cards/${data}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  };

  addCardLike = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  };

  deleteCardLike = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  };
}
