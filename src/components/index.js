import '../pages/index.css';

import { enableValidation } from './validate.js';

import {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, submitPhotoForm} from './card.js'

import {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupProfile, popupPhoto, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput, popupAvatar, renderLoading, avatarForm, avatarInput, avatarLoading, avatarSaveText}
from './modal.js'

import { getInitialProfile, getInitialCards, changeAvatar } from './api.js'

const avatar = document.querySelector('.profile__img')

export let userId

getInitialProfile()
.then((result) => {
  console.log(result)
  nameInput.value = result.name
  jobInput.value = result.about
  avatar.src = result.avatar
  profileName.textContent = result.name
  profileJob.textContent = result.about
  userId = result._id
  // добавляем готовые карточки
  getInitialCards()
  .then((result) => {
  console.log(result)
  result.forEach((card) => {
    renderPhoto(card, userId)
  })
  })
  return userId
})
.catch((err) => {
  console.log(err)
})

const changeAvatarButton = document.querySelector('.profile__img-overlay')
editButton.addEventListener( 'click', ()=> openPopup(popupProfile) );
addButton.addEventListener( 'click', ()=> openPopup(popupAddPhoto) );
changeAvatarButton.addEventListener('click', () => openPopup(popupAvatar))

formElementProfile.addEventListener('submit', formProfileSubmitHandler);

formPhoto.addEventListener('submit', submitPhotoForm);

avatarForm.addEventListener('submit' , () => {
  renderLoading(avatarSaveText, avatarLoading, true, 'Сохранение')
  changeAvatar(avatarInput.value)
  .then((result) => {
    avatar.src = result.avatar
    closePopup(popupAvatar)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(avatarSaveText, avatarLoading, false, 'Сохранить')
  })
})

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save'
})
