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
const popups = document.querySelectorAll(".popup");

function openPopup(index){
  popups[index].classList.add("popup_opened");
}

function closePopup(index){
  popups[index].classList.remove("popup_opened");
}

editButton.addEventListener( 'click', ()=> openPopup(0) );
addButton.addEventListener( 'click', ()=> openPopup(1) );
closeProfile.addEventListener( 'click', ()=> closePopup(0) );
closeAddPhoto.addEventListener( 'click', ()=> closePopup(1) );

// Замена данных профиля
function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(0)
}
formElementProfile.addEventListener('submit', formProfileSubmitHandler);

// Добавление фото
function addPhoto(place, link) {
  const photoTemplate = document.querySelector('.photo__template').content;
  const photoElement = photoTemplate.querySelector('.element').cloneNode(true);
  photoElement.querySelector('.element__title').textContent = place
  const photo = photoElement.querySelector('.element__img')
  photo.src = link
  photo.alt = place
  // ставим лайк
  photoElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active')
  })
  closePopup(1)
  // удаляем карточки
  const deleteButton = photoElement.querySelector('.element__delete')
  deleteButton.addEventListener('click', function() {
    photoElement.remove()
  })
  // открываем попап с картинкой
  photo.addEventListener('click', function(){
    openPopup(2)
    popupImage.src = link
    popupImage.alt = place
    popupImageTitle.textContent = place
  })
  return photoContainer.prepend(photoElement)
}
// получаем данные для фото
function formSubmitPhoto (evt) {
  evt.preventDefault()
  addPhoto(photoPlaceInput.value, photoLinkInput.value)
  photoPlaceInput.value.reset()
  photoLinkInput.value.reset()
  photoContainer.prepend(photoElement)
}
formPhoto.addEventListener('submit', formSubmitPhoto);
popupPhotoCloseButton.addEventListener('click', ()=> closePopup(2))

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
  addPhoto(card.name, card.link)
})
