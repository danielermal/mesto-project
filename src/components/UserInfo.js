export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector, userInfo, nameInFormSelector, aboutInFormSelector}) {
    this.name = document.querySelector(nameSelector)
    this.about = document.querySelector(aboutSelector)
    this.avatar = document.querySelector(avatarSelector)
    this.nameInForm = document.querySelector(nameInFormSelector)
    this.aboutInForm = document.querySelector(aboutInFormSelector)
    this.userInfo = userInfo
  }

  getUserInfo () {
    this.name.textContent = this.userInfo.name
    this.about.textContent = this.userInfo.about
    this.avatar.src = this.userInfo.avatar
    this.nameInForm.value = this.userInfo.name
    this.aboutInForm.value = this.userInfo.about
  }

  setUserInfo(profile) {
      this.name.textContent = profile.name
      this.about.textContent = profile.about
      this.nameInForm.value = profile.name
      this.aboutInForm.value = profile.about
  }
}
