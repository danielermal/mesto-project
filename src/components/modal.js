const enableModal = {
  editButton: '.profile__edit',
  addButton: '.profile__add-button',
  closeProfile: '.popup__close_profile',
  closeAddPhoto: '.popup__close_add-photo',
  popupPhotoCloseButton: '.popup__close_photo',
  popupProfile: '.popup_profile',
  popupAddPhoto: '.popup_add-photo',
  popupPhoto: '.popup_photo',
  popup: '.popup',
  profileName: '.profile__title',
  profileJob: '.profile__subtitle',
  formElementProfile: '.popup__form_profile',
  nameInput: '#name',
  jobInput: '#hobbie'
}

const editButton = document.querySelector(enableModal.editButton);
const addButton = document.querySelector(enableModal.addButton);
const closeProfile = document.querySelector(enableModal.closeProfile);
const closeAddPhoto = document.querySelector(enableModal.closeAddPhoto);
const popupPhotoCloseButton = document.querySelector(enableModal.popupPhotoCloseButton)
const popupProfile = document.querySelector(enableModal.popupProfile)
const popupAddPhoto = document.querySelector(enableModal.popupAddPhoto)
const popupPhoto = document.querySelector(enableModal.popupPhoto)
const popup = document.querySelectorAll(enableModal.popup)
const profileName = document.querySelector(enableModal.profileName)
const profileJob = document.querySelector(enableModal.profileJob)
const formElementProfile = document.querySelector(enableModal.formElementProfile)
const nameInput = formElementProfile.querySelector(enableModal.nameInput)
const jobInput = formElementProfile.querySelector(enableModal.jobInput)


function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

// Замена данных профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}

//  Закрываем попап при клике за зетемненную обасть
popup.forEach(function (item) {
  item.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(item)
    }
  })
})
// Закрываем при нажатии Esc
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popup.forEach((item) => {
      closePopup(item)
    })
  }
})

export {popupAddPhoto, closePopup, enableModal, editButton, addButton, closeProfile, popupPhotoCloseButton, closeAddPhoto, popupProfile, popupPhoto, popup, openPopup, formProfileSubmitHandler, profileName, profileJob, formElementProfile, nameInput, jobInput}
