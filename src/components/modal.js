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
  jobInput: '#hobbie'
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


function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape)
  closePopupByClick(popup)
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape)
}

// Замена данных профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}

//  Закрываем попап при клике за зетемненную обасть
function closePopupByClick (popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
}

// Закрываем при нажатии Esc
function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

export {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupProfile, popupPhoto, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput}
