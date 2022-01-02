import '../pages/index.css';

import { enableValidation } from './validate.js';

import {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, submitPhotoForm} from './card.js'

import {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupPhotoCloseButton, closeAddPhoto, popupProfile, popupPhoto, popups, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput, popupAvatar} from './modal.js'

import { getInitialProfile, getInitialCards } from './api.js'

export const avatar = document.querySelector('.profile__img')

getInitialProfile()
.then((result) => {
  console.log(result)
  nameInput.value = result.name
  jobInput.value = result.about
  avatar.src = result.avatar
  profileName.textContent = result.name
  profileJob.textContent = result.about
  // добавляем готовые карточки
  getInitialCards()
  .then((result) => {
  console.log(result)
  result.forEach((card) => {
    renderPhoto(card)
  })
})
})
.catch((err) => {
  console.log(err)
})

const changeAvatarButton = document.querySelector('.profile__img-overlay')
editButton.addEventListener( 'click', ()=> openPopup(popupProfile) );
addButton.addEventListener( 'click', ()=> openPopup(popupAddPhoto) );
changeAvatarButton.addEventListener('click', () => openPopup(popupAvatar))

formElementProfile.addEventListener('submit', formProfileSubmitHandler);

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save'
})
