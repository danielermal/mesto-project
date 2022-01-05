import { changeProfile } from "./api.js";

const enableModal = {
  editButton: '.profile__edit',
  addButton: '.profile__add-button',
  closeProfile: '.popup__close_profile',
  popupProfile: '.popup_profile',
  popupAddPhoto: '.popup_add-photo',
  popupPhoto: '.popup_photo',
  profileName: '.profile__title',
  profileJob: '.profile__subtitle',
  formElementProfile: '.popup__form_profile',
  nameInput: '#name',
  jobInput: '#hobbie',
  popups: '.popup',
  popupAvatar: '.popup_change-avatar',
  avatarForm: '.popup__form_avatar',
  avatarInput: '#avatar',
  avatarLoading: '.popup__loading',
  avatarSaveText: '.popup__save-text'
}

const editButton = document.querySelector(enableModal.editButton);
const addButton = document.querySelector(enableModal.addButton);
const closeProfile = document.querySelector(enableModal.closeProfile);
const popupProfile = document.querySelector(enableModal.popupProfile)
const popupAddPhoto = document.querySelector(enableModal.popupAddPhoto)
const popupPhoto = document.querySelector(enableModal.popupPhoto)
const profileName = document.querySelector(enableModal.profileName)
const profileJob = document.querySelector(enableModal.profileJob)
const formElementProfile = document.querySelector(enableModal.formElementProfile)
const nameInput = formElementProfile.querySelector(enableModal.nameInput)
const jobInput = formElementProfile.querySelector(enableModal.jobInput)
const popupProfileSaveText = formElementProfile.querySelector(enableModal.avatarSaveText)
const popupProfileLoading = formElementProfile.querySelector(enableModal.avatarLoading)
const popups = document.querySelectorAll(enableModal.popups)
const popupAvatar = document.querySelector(enableModal.popupAvatar)
const avatarForm = document.querySelector(enableModal.avatarForm)
const avatarInput = document.querySelector(enableModal.avatarInput)
const avatarLoading = avatarForm.querySelector(enableModal.avatarLoading)
const avatarSaveText = avatarForm.querySelector(enableModal.avatarSaveText)

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape)
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape)
}

// Замена данных профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  renderLoading(popupProfileSaveText, popupProfileLoading, true, 'Сохранение')
  changeProfile(nameInput.value, jobInput.value)
  .then((result) => {
    console.log(result)
    profileName.textContent = result.name
    profileJob.textContent = result.about
    closePopup(popupProfile)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(popupProfileSaveText, popupProfileLoading, false, 'Сохранить')
  })
}

//  Закрываем попап при клике за зетемненную обасть
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// Закрываем при нажатии Esc
function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// создаем видимость загрузки
function renderLoading (button, element, status, text) {
  if (status) {
    button.textContent = text
    element.classList.add('popup__loading_active')
  }
  else {
    button.textContent = text
    element.classList.remove('popup__loading_active')
  }
}

export {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupProfile, popupPhoto, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput, popupAvatar, renderLoading, avatarForm, avatarInput, avatarLoading, avatarSaveText}
