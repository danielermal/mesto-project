const enableValidation = {
  saveProfileButton: '.popup__save_profile',
  savePhotoButton: '.popup__save_photo',
};

const popupSaveProfileButton = document.querySelector(enableValidation.saveProfileButton)
const popupSavePhotoButton = document.querySelector(enableValidation.savePhotoButton)


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
    saveButton.classList.remove('popup__save_disabled')
    saveButton.disabled = 0
  }
  else {
    saveButton.classList.add('popup__save_disabled')
    saveButton.disabled = 1
  }
}

export {popupSavePhotoButton, popupSaveProfileButton, enableValidation, checkInputValidity, showError, hideError, disabledButton}
