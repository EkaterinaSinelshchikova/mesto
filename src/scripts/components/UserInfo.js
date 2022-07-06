export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const data = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;
  }
}
