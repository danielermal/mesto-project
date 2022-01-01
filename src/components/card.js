import { closePopup,  popupAddPhoto, openPopup, popupPhoto } from "./modal.js"
import { getInitialCards, addNewCard, getInitialProfile, removeCard, addLike, removeLike } from "./api.js"
import { profileName, renderLoading } from "./modal.js"

const enableCard = {
  popupImage:'.popup__image',
  popupImageTitle: '.popup__image-title',
  photoContainer: '.elements',
  formPhoto: '.form__photo',
  photoPlaceInput: '#place',
  photoLinkInput: '#link',
  popupSavePhotoButton: '.popup__save_photo',
  popupSavePhotoButtonText: '.popup__save-text',
  popupSavePhotoLoading: '.popup__loading',
  popupRemovePhoto: '.popup_remove-photo',
  popupRemovePhotoButton: '.popup__save_remove-photo'
}

const popupImage = document.querySelector(enableCard.popupImage)
const popupImageTitle = document.querySelector(enableCard.popupImageTitle)
const photoContainer = document.querySelector(enableCard.photoContainer)
const formPhoto = document.querySelector(enableCard.formPhoto)
const photoPlaceInput = formPhoto.querySelector(enableCard.photoPlaceInput)
const photoLinkInput = formPhoto.querySelector(enableCard.photoLinkInput)
const popupSavePhotoButton = document.querySelector(enableCard.popupSavePhotoButton)
const popupRemovePhoto = document.querySelector(enableCard.popupRemovePhoto)
const popupRemovePhotoButton = document.querySelector(enableCard.popupRemovePhotoButton)
const popupSavePhotoButtonText = formPhoto.querySelector(enableCard.popupSavePhotoButtonText)
const popupSavePhotoLoading = formPhoto.querySelector(enableCard.popupSavePhotoLoading)


// Создание карточки с фото
function addCard(place, link) {
  const cardTemplate = document.querySelector('.photo__template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = place
  const cardImage = cardElement.querySelector('.element__img')
  cardImage.src = link
  cardImage.alt = place
  // открываем попап с картинкой
  cardImage.addEventListener('click', function(){
    openPopup(popupPhoto)
    popupImage.src = link
    popupImage.alt = place
    popupImageTitle.textContent = place
  })
  return cardElement
}
// вставляем карточку
function renderPhoto(card) {
  photoContainer.prepend(addCard(card.name, card.link));
  const cardElement = photoContainer.querySelector(".element");
  addDeleteButton(cardElement, createDeleteButton(), card);
  // показываем количество лайков
  const cardNumbersOfLikes = cardElement.querySelector(
    ".element__numbers-of-likes"
  );
  addNumbersOfLikes(cardNumbersOfLikes, card.likes);
  // ставим лайк
  const cardLikeButton = cardElement.querySelector(".element__like")
  cardLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
    showNumbersOfLikes(cardLikeButton, cardNumbersOfLikes, card._id)
  });
  showMyActiveLikes(profileName.textContent, card, cardLikeButton)
}

// получаем данные для фото
function submitPhotoForm (evt) {
  evt.preventDefault()
  renderLoading(popupSavePhotoButtonText, popupSavePhotoLoading, true, 'Создание')
  addNewCard(photoPlaceInput.value, photoLinkInput.value)
  .then((result) => {
    renderPhoto(result)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(popupSavePhotoButtonText, popupSavePhotoLoading, false, 'Создать')
    closePopup(popupAddPhoto)
    formPhoto.reset()
    popupSavePhotoButton.disabled = 1
    popupSavePhotoButton.classList.add('popup__save_disabled')
  })
}

formPhoto.addEventListener('submit', submitPhotoForm);

// добавляем готовые карточки
getInitialCards()
.then((result) => {
  console.log(result)
  result.forEach((card) => {
    renderPhoto(card)
  })
})

function addNumbersOfLikes (element, likes) {
  if (likes.length > 0) {
    element.textContent = likes.length
  }
  else {
    element.textContent = ''
  }
}

function createDeleteButton () {
  return `<button class="element__delete" type="button"></button>`
}

function addDeleteButton (container, markup, card) {
  getInitialProfile()
  .then((result) => {
    if (result.name === card.owner.name) {
      container.insertAdjacentHTML("beforeend", markup);
      console.log(container);
      // удаляем карточки
      const deleteButton = container.querySelector(".element__delete");
      deleteButton.addEventListener("click", function () {
        openPopup(popupRemovePhoto);
        popupRemovePhoto.addEventListener("click", (evt) => {
          if (evt.target.classList.contains('popup__save_remove-photo')) {
            container.remove();
            closePopup(popupRemovePhoto);
            removeCard(card._id)
          }
        });
      });
    }
  })
}

function showNumbersOfLikes (likeButton, showLikesElement, id) {
  if (likeButton.classList.contains('element__like_active')) {
    addLike(id)
    .then((result) => {
      console.log(result)
      addNumbersOfLikes(showLikesElement, result.likes)
    })
  }
  else {
    removeLike(id)
    .then((result) => {
      console.log(result)
      addNumbersOfLikes(showLikesElement, result.likes)
    })
  }
}

function showMyActiveLikes (name, card, likeButton) {
  card.likes.forEach((like) => {
    if (like.name === name) {
      likeButton.classList.add('element__like_active')
    }
  })
}

export {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, submitPhotoForm}
