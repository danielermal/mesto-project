import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor ({submitForm, inputSelector, buttonTextSelector, loadingElementSelector}, popupSelector) {
    super(popupSelector)
    this.submitForm = submitForm
    this.form = this._popup.querySelector('.popup__form')
    this._inputList = this.form.querySelectorAll(inputSelector)
    this.buttonText = this.form.querySelector(buttonTextSelector)
    this.loadingElement = this.form.querySelector(loadingElementSelector)
  }

  getInputValues () {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues
  }

  setEventListeners () {
    this.form.addEventListener('submit', this.submitForm.bind(this))
    super.setEventListeners()
  }

  closePopup (status) {
    if (status) {
      this.form.reset()
    }
    super.closePopup()
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

  setInputValues(user) {
    this._inputList.forEach(
      (input) => (input.value = user[input.name])
    );
  }
}
