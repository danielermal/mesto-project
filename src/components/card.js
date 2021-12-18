import { closePopup,  popupAddPhoto, openPopup, popupPhoto} from "./modal.js"
const enableCard = {
  popupImage:'.popup__image',
  popupImageTitle: '.popup__image-title',
  photoContainer: '.elements',
  formPhoto: '.form__photo',
  photoPlaceInput: '#place',
  photoLinkInput: '#link'
}

const popupImage = document.querySelector(enableCard.popupImage)
const popupImageTitle = document.querySelector(enableCard.popupImageTitle)
const photoContainer = document.querySelector(enableCard.photoContainer)
const formPhoto = document.querySelector(enableCard.formPhoto)
const photoPlaceInput = formPhoto.querySelector(enableCard.photoPlaceInput)
const photoLinkInput = formPhoto.querySelector(enableCard.photoLinkInput)

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

export {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, formSubmitPhoto}
