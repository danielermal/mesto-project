import '../pages/index.css';

import { enableValidation } from './validate.js';

import {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, submitPhotoForm} from './card.js'

import {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupPhotoCloseButton, closeAddPhoto, popupProfile, popupPhoto, popups, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput} from './modal.js'

editButton.addEventListener( 'click', ()=> openPopup(popupProfile) );
addButton.addEventListener( 'click', ()=> openPopup(popupAddPhoto) );

formElementProfile.addEventListener('submit', formProfileSubmitHandler);

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save'
})


