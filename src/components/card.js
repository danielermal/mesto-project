import { closePopup,  popupAddPhoto, openPopup, popupPhoto, renderLoading } from "./modal.js"
import { addNewCard, removeCard, addLike, removeLike, getInitialProfile } from "./api.js"

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

let userId

// Создание карточки с фото
function addCard(card, id) {
  const cardTemplate = document.querySelector(".photo__template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = card.name;
  const cardImage = cardElement.querySelector(".element__img");
  cardImage.src = card.link;
  cardImage.alt = card.place;
  // удаляем карточки
  if (id === card.owner._id) {
    addDeleteButton(cardElement, createDeleteButton(), card, id).addEventListener("click", () => {
      removeCard(card._id)
        .then((res) => {
          console.log(res)
          cardElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  // открываем попап с картинкой
  cardImage.addEventListener("click", function () {
    openPopup(popupPhoto);
    popupImage.src = card.link;
    popupImage.alt = card.place;
    popupImageTitle.textContent = card.place;
  });
  return cardElement;
}
// вставляем карточку
function renderPhoto(card, id) {
  photoContainer.prepend(addCard(card, id));
  const cardElement = photoContainer.querySelector(".element");
  // показываем количество лайков
  const cardNumbersOfLikes = cardElement.querySelector(
    ".element__numbers-of-likes"
  );
  // ставим лайк
  const cardLikeButton = cardElement.querySelector(".element__like")
  addNumbersOfLikes(cardNumbersOfLikes, card.likes, id, cardLikeButton);
  cardLikeButton.addEventListener("click", function (evt) {
    showNumbersOfLikes(cardLikeButton, cardNumbersOfLikes, card._id)
  });
}

// получаем данные для фото
function submitPhotoForm (evt) {
  evt.preventDefault()
  renderLoading(popupSavePhotoButtonText, popupSavePhotoLoading, true, 'Создание')
  getInitialProfile()
  .then((res) => {
    userId = res._id
    addNewCard(photoPlaceInput.value, photoLinkInput.value)
    .then((result) => {
      renderPhoto(result, userId)
      closePopup(popupAddPhoto)
      formPhoto.reset()
      popupSavePhotoButton.disabled = 1
      popupSavePhotoButton.classList.add('popup__save_disabled')
    })
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(popupSavePhotoButtonText, popupSavePhotoLoading, false, 'Создать')
  })
}

function addNumbersOfLikes (element, likes, userId, likeButton) {
  if (likes.length > 0) {
    element.textContent = likes.length
    likes.forEach((like) => {
      if (like._id === userId) {
        likeButton.classList.add('element__like_active')
      }
    })
  }
  else {
    element.textContent = ''
  }
}

function createDeleteButton () {
  return `<button class="element__delete" type="button"></button>`
}

function addDeleteButton (container, markup) {
    container.insertAdjacentHTML("beforeend", markup);
    const deleteButton = container.querySelector(".element__delete");
    return deleteButton;
}

function showNumbersOfLikes (likeButton, showLikesElement, id) {
  if (!likeButton.classList.contains('element__like_active')) {
    addLike(id)
    .then((result) => {
      likeButton.classList.add("element__like_active");
      console.log(result)
      addNumbersOfLikes(showLikesElement, result.likes)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  else {
    removeLike(id)
    .then((result) => {
      likeButton.classList.remove("element__like_active");
      console.log(result)
      addNumbersOfLikes(showLikesElement, result.likes)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export {enableCard, popupImage, popupImageTitle, photoContainer, formPhoto, photoPlaceInput, photoLinkInput, addCard, renderPhoto, submitPhotoForm}
