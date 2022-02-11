export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this.name = document.querySelector(nameSelector)
    this.about = document.querySelector(aboutSelector)
    this.avatar = document.querySelector(avatarSelector)
  }

  getUserInfo (profile) {
    this.userInfo = profile
    return this.userInfo
  }

  setUserInfo() {
      this.name.textContent = this.userInfo.name
      this.about.textContent = this.userInfo.about
      this.avatar.src = this.userInfo.avatar
  }
}
