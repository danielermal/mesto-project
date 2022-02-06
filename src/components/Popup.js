export class Popup {
  constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector)
  }

  openPopup (){
    this.popup.classList.add('popup_opened');
    this.setEventListeners()
  }

  closePopup(){
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose.bind(this))
    this.popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          this.closePopup()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup()
      }
    })
  }
}
