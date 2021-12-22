const enableValidation = ({formSelector, inputSelector, submitButtonSelector}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

    });
    const getInputList = Array.from(formElement.querySelectorAll(inputSelector))
    const saveButton = formElement.querySelector(submitButtonSelector)
    getInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement)
        disabledButton(getInputList[0], getInputList[1], saveButton)
      })
    })
  })
};

function checkInputValidity (input) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage)
  }
  else {
    hideError(input)
  }
}

function showError(input, errorMessage) {
  input.classList.add(`${input.classList[0]}_type_error`)
  const inputError = input.nextElementSibling
  inputError.textContent = errorMessage
  inputError.classList.add(`${inputError.classList[0]}_active`)
}

function hideError (input) {
  input.classList.remove(`${input.classList[0]}_type_error`)
  const inputError = input.nextElementSibling
  inputError.textContent = ''
  inputError.classList.remove(`${inputError.classList[0]}_active`)
}

function disabledButton (inputOne, inputTwo, saveButton) {
  if (inputOne.validity.valid && inputTwo.validity.valid) {
    saveButton.classList.remove(`${saveButton.classList[0]}_disabled`)
    saveButton.disabled = 0
  }
  else {
    saveButton.classList.add(`${saveButton.classList[0]}_disabled`)
    saveButton.disabled = 1
  }
}

export { enableValidation }
