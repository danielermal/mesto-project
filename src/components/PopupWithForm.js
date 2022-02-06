import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor ({submitForm, formSelector, inputSelector, buttonTextSelector, loadingElementSelector}, popupSelector) {
    super(popupSelector)
    this.submitForm = submitForm
    this.form = document.querySelector(formSelector)
    this.inputList = this.form.querySelectorAll(inputSelector)
    this.buttonText = this.form.querySelector(buttonTextSelector)
    this.loadingElement = this.form.querySelector(loadingElementSelector)
  }

  getInputValues () {
    let values = []
    this.inputList.forEach(item => {
      values.push(item.value)
    })
    return values
  }

  setEventListeners () {
    this.form.addEventListener('submit', this.submitForm.bind(this))
    super.setEventListeners()
  }

  closePopup (status) {
    if (status) {
      this.form.reset()
      super.closePopup()
    }
    else {
      super.closePopup()
    }
  }

  renderLoading (status, text) {
    if (status) {
      this.buttonText.textContent = text
      this.loadingElement.classList.add('popup__loading_active')
      console.log(status)
    }
    else {
      this.buttonText.textContent = text
      this.loadingElement.classList.remove('popup__loading_active')
    }
  }
}
