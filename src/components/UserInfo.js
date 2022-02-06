import { api } from "./Api.js"

export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector, userInfo, nameInFormSelector, aboutInFormSelector, renderLoading}) {
    this.name = document.querySelector(nameSelector)
    this.about = document.querySelector(aboutSelector)
    this.avatar = document.querySelector(avatarSelector)
    this.nameInForm = document.querySelector(nameInFormSelector)
    this.aboutInForm = document.querySelector(aboutInFormSelector)
    this.userInfo = userInfo
    this.renderLoading = renderLoading
  }

  getUserInfo () {
    this.name.textContent = this.userInfo.name
    this.about.textContent = this.userInfo.about
    this.avatar.src = this.userInfo.avatar
    this.nameInForm.value = this.userInfo.name
    this.aboutInForm.value = this.userInfo.about
  }

  setUserInfo () {
    api.changeProfile(this.nameInForm.value, this.aboutInForm.value)
    .then((result) => {
      this.name.textContent = result.name
      this.about.textContent = result.about
      this.nameInForm.value = result.name
      this.aboutInForm.value = result.about
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      this.renderLoading()
    })
  }
}
