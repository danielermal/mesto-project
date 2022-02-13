export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector)
    this._about = document.querySelector(aboutSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo () {
    const profile = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id
    }
    return profile
  }

  setUserInfo({name, about, avatar, id}) {
      this._name.textContent = name
      this._about.textContent = about
      this._avatar.src = avatar
      this._id = id
  }
}
