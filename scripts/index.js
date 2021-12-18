const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add-button");
const closeProfile = document.querySelector(".popup__close_profile");
const closeAddPhoto = document.querySelector(".popup__close_add-photo");
const formElementProfile = document.querySelector('.popup__form_profile')
const nameInput = formElementProfile.querySelector('#name')
const jobInput = formElementProfile.querySelector('#hobbie')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const photoContainer = document.querySelector('.elements')
const formPhoto = document.querySelector('.form__photo')
const photoPlaceInput = formPhoto.querySelector('#place')
const photoLinkInput = formPhoto.querySelector('#link')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title')
const popupPhotoCloseButton = document.querySelector('.popup__close_photo')
const popupProfile = document.querySelector('.popup_profile')
const popupAddPhoto = document.querySelector('.popup_add-photo')
const popupSaveProfileButton = popupProfile.querySelector('.popup__save')
const popupSavePhotoButton = popupAddPhoto.querySelector('.popup__save_photo')
const popupPhoto = document.querySelector('.popup_photo')
const popup = document.querySelectorAll('.popup')

function openPopup(popup){
  popup.classList.add("popup_opened");
}

function closePopup(popup){
  popup.classList.remove("popup_opened");
}

editButton.addEventListener( 'click', ()=> openPopup(popupProfile) );
addButton.addEventListener( 'click', ()=> openPopup(popupAddPhoto) );
closeProfile.addEventListener( 'click', ()=> closePopup(popupProfile) );
closeAddPhoto.addEventListener( 'click', ()=> closePopup(popupAddPhoto) );

// Замена данных профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}
formElementProfile.addEventListener('submit', formProfileSubmitHandler);

// Создание карточки с фото
function addCard(place, link) {
  const cardTemplate = document.querySelector('.photo__template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = place
  const card = cardElement.querySelector('.element__img')
  card.src = link
  card.alt = place
  // ставим лайк
  cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active')
  })
  // удаляем карточки
  const deleteButton = cardElement.querySelector('.element__delete')
  deleteButton.addEventListener('click', function() {
    cardElement.remove()
  })
  // открываем попап с картинкой
  card.addEventListener('click', function(){
    openPopup(popupPhoto)
    popupImage.src = link
    popupImage.alt = place
    popupImageTitle.textContent = place
  })
  return cardElement
}
// вставляем карточку
function renderPhoto(photoPlace, photoLink) {
  photoContainer.prepend(addCard(photoPlace, photoLink))
}

// получаем данные для фото
function formSubmitPhoto (evt) {
  evt.preventDefault()
  renderPhoto(photoPlaceInput.value, photoLinkInput.value)
  formPhoto.reset()
  closePopup(popupAddPhoto)
}
formPhoto.addEventListener('submit', formSubmitPhoto);
popupPhotoCloseButton.addEventListener('click', ()=> closePopup(popupPhoto))

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
initialCards.forEach(function (card) {
  renderPhoto(card.name, card.link)
})

// валидация формы профиля

nameInput.addEventListener('input', function () {
  checkInputValidity (nameInput)
  disabledButton (nameInput, jobInput, popupSaveProfileButton)
})

jobInput.addEventListener('input', function () {
  checkInputValidity (jobInput)
  disabledButton (nameInput, jobInput, popupSaveProfileButton)
})

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

// валидация добавления карточки
photoPlaceInput.addEventListener('input', function () {
  checkInputValidity (photoPlaceInput)
  disabledButton (photoPlaceInput, photoLinkInput, popupSavePhotoButton)
})

photoLinkInput.addEventListener('input', function() {
  checkInputValidity (photoLinkInput)
  disabledButton (photoPlaceInput, photoLinkInput, popupSavePhotoButton)
})

//  Закрываем попап при клике за зетемненную обасть
popup.forEach(function (item) {
  item.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(item)
    }
  })
})

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popup.forEach((item) => {
      closePopup(item)
    })
  }
})
