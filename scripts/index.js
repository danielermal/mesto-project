const addButton = document.querySelector('.profile__add-button')
const popupAddPhoto = document.querySelector('.popup_addphoto')
const editButton = document.querySelector('.profile__edit')
const popupProfile = document.querySelector('.popup')
const closeProfile = document.querySelector('.popup__close')
const closePhoto = document.querySelector('.popup__close_addphoto')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('#name')
const jobInput = formElement.querySelector('#hobbie')
const profileName = document.querySelector('.profile__title')
const profileHobbie = document.querySelector('.profile__subtitle')
const photoContainer = document.querySelector('.elements')
const savePhoto = document.querySelector('.popup__save_photo')
const formPhoto = document.querySelector('.form__photo')

// add/close Popup
editButton.addEventListener('click', function() {
  popupProfile.classList.add('popup_opened')
})
closeProfile.addEventListener('click', closePopup)
function closePopup() {
  popupProfile.classList.remove('popup_opened')
}

// add/close popupAddPhoto
addButton.addEventListener('click', function() {
  popupAddPhoto.classList.add('popup_opened')
})
closePhoto.addEventListener('click', closepopupAddPhoto)
function closepopupAddPhoto() {
  popupAddPhoto.classList.remove('popup_opened')
}

// Замена данных профиля
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileHobbie.textContent = jobInput.value
    closePopup()
}
formElement.addEventListener('submit', formSubmitHandler);

// Добавление фото
function addphoto(place, link) {
  const photoTemplate = document.querySelector('.photo__template').content;
  const photoElement = photoTemplate.querySelector('.element').cloneNode(true);
  photoElement.querySelector('.element__title').textContent = place
  const photo = photoElement.querySelector('.element__img')
  photo.src = link
  photo.alt = place
  photoElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active')
  })
  photoContainer.prepend(photoElement)
  // удаляем карточки
  const deleteButton = photoElement.querySelector('.element__delete')
  deleteButton.addEventListener('click', function() {
    photoElement.remove()
  })
  // открываем попап с картинкой
  photo.addEventListener('click', function(){
    const popupPhotoWindow = document.querySelector('.popup_photo')
    popupPhotoWindow.classList.add('popup_opened')
    const popupImage = popupPhotoWindow.querySelector('.popup__image')
    popupImage.src = link
    popupImage.alt = place
    const popupImageTitle = popupPhotoWindow.querySelector('.popup__image-title').textContent = place
    const popupPhotoCloseButton = popupPhotoWindow.querySelector('.popup__close').addEventListener('click', function () {
      popupPhotoWindow.classList.remove('popup_opened')
    })
  })
}

function formSubmitPhoto (evt) {
  evt.preventDefault()
  const photoPlace = formPhoto.querySelector('#place')
  const photoLink = formPhoto.querySelector('#link')

  addphoto(photoPlace.value, photoLink.value)
  photoPlace.value = ''
  photoLink.value = ''
  closepopupAddPhoto()
}
formPhoto.addEventListener('submit', formSubmitPhoto);

// добавляем шесть карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(function (a) {
  const places = a.name
  const links = a.link
  addphoto(places, links)
})


