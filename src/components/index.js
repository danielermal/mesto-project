import '../pages/index.css';

import {popupSavePhotoButton, popupSaveProfileButton, enableValidation, checkInputValidity, showError, hideError, disabledButton} from './validate.js';

import {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, formSubmitPhoto} from './card.js'

import {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupPhotoCloseButton, closeAddPhoto, popupProfile, popupPhoto, popup, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput} from './modal.js'

editButton.addEventListener( 'click', ()=> openPopup(popupProfile) );
addButton.addEventListener( 'click', ()=> openPopup(popupAddPhoto) );
closeProfile.addEventListener( 'click', ()=> closePopup(popupProfile) );
closeAddPhoto.addEventListener( 'click', ()=> closePopup(popupAddPhoto) );


formElementProfile.addEventListener('submit', formProfileSubmitHandler);

formPhoto.addEventListener('submit', formSubmitPhoto);
popupPhotoCloseButton.addEventListener('click', ()=> closePopup(popupPhoto))



// валидация формы профиля
nameInput.addEventListener('input', function () {
  checkInputValidity (nameInput)
  disabledButton (nameInput, jobInput, popupSaveProfileButton)
})

jobInput.addEventListener('input', function () {
  checkInputValidity (jobInput)
  disabledButton (nameInput, jobInput, popupSaveProfileButton)
})

// валидация добавления карточки
photoPlaceInput.addEventListener('input', function () {
  checkInputValidity (photoPlaceInput)
  disabledButton (photoPlaceInput, photoLinkInput, popupSavePhotoButton)
})

photoLinkInput.addEventListener('input', function() {
  checkInputValidity (photoLinkInput)
  disabledButton (photoPlaceInput, photoLinkInput, popupSavePhotoButton)
})


