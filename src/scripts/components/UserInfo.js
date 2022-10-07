export class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo = () => {
    const data = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
    return data;
  };

  setUserInfo = (data) => {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._id = data._id;
  };

  setAvatar = (data) => {
    this._profileAvatar.src = data.avatar;
    this._profileAvatar.alt = data.name;
  };

  setUserId = (id) => {
    this._id = id;
  };

  getUserId = () => {
    return this._id;
  };
}
