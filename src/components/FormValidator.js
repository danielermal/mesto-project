export class FormValidator {
  constructor ({formSelector, inputSelector, buttonSelector}) {
    this.formSelector = formSelector
    this.inputSelector = inputSelector
    this.buttonSelector = buttonSelector
  }

  enableValidation () {
    Array.from(document.querySelectorAll(this.formSelector)).forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      const getInputList = Array.from(formElement.querySelectorAll(this.inputSelector))
      const saveButton = formElement.querySelector(this.buttonSelector)
      this.disabledButton(getInputList, saveButton)
      getInputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this.checkInputValidity(inputElement)
          this.disabledButton(getInputList, saveButton)
        })
      })
    })
  }

  checkInputValidity (input) {
    if (!input.validity.valid) {
      this.showError(input, input.validationMessage)
    }
    else {
      this.hideError(input)
    }
  }

  showError(input, errorMessage) {
    input.classList.add(`${input.classList[0]}_type_error`)
    const inputError = input.nextElementSibling
    inputError.textContent = errorMessage
    inputError.classList.add(`${inputError.classList[0]}_active`)
  }

  hideError (input) {
    input.classList.remove(`${input.classList[0]}_type_error`)
    const inputError = input.nextElementSibling
    inputError.textContent = ''
    inputError.classList.remove(`${inputError.classList[0]}_active`)
  }

  disabledButton (inputList, saveButton) {
    console.log('1')
    if (inputList.every((inputElement) => inputElement.validity.valid
    )) {
      saveButton.classList.remove(`${saveButton.classList[0]}_disabled`)
      saveButton.disabled = 0
    }
    else {
      saveButton.classList.add(`${saveButton.classList[0]}_disabled`)
      saveButton.disabled = 1
    }
  }
}
