import { api } from "./Api.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { popupImage, popupImageTitle } from "../utils/constants.js";

export class Card {
    constructor(card, id, selector, {handleCardClick}) {
        this._card = card;
        this._id = id;
        this._selector = selector;
        this._handleCardClick = handleCardClick
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content.querySelector(".element")
            .cloneNode(true);
        return cardElement;
    }

    getCard() {
        this.element = this._getElement();
        this.element.querySelector(".element__title").textContent = this._card.name;
        this.cardImage = this.element.querySelector(".element__img");
        this.cardImage.src = this._card.link;
        this.cardImage.alt = this._card.name;
        this._setEventListeners()
        return this.element;
    }

    _setEventListeners() {
      this._deleteCard();
      this._showLikesElement();
      this.cardImage.addEventListener('click', () => {
        this._handleCardClick(popupImage, popupImageTitle, this._card);
      })
    }

    _deleteCard() {
        if (this._id === this._card.owner._id) {
            this._addDeleteButton(this._createDeleteButton()).addEventListener(
                "click",
                () => {
                    api
                        .removeCard(this._card._id)
                        .then((res) => {
                            console.log(res);
                            this.element.remove();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            );
        }
    }

    _showLikesElement() {
        // показываем количество лайков
        const cardNumbersOfLikes = this.element.querySelector(
            ".element__numbers-of-likes"
        );
        // ставим лайк
        const cardLikeButton = this.element.querySelector(".element__like");
        this._addNumbersOfLikes(
            cardNumbersOfLikes,
            this._card.likes,
            this._id,
            cardLikeButton
        );
        cardLikeButton.addEventListener("click", (evt) => {
            this._showNumbersOfLikes(
                cardLikeButton,
                cardNumbersOfLikes,
                this._card._id
            );
        });
    }

    _addNumbersOfLikes(element, likes, userId, likeButton) {
        if (likes.length > 0) {
            element.textContent = likes.length;
            likes.forEach((like) => {
                if (like._id === userId) {
                    likeButton.classList.add("element__like_active");
                }
            });
        } else {
            element.textContent = "";
        }
    }

    _createDeleteButton() {
        return `<button class="element__delete" type="button"></button>`;
    }

    _addDeleteButton(markup) {
      this.element.insertAdjacentHTML("beforeend", markup);
        const deleteButton = this.element.querySelector(".element__delete");
        return deleteButton;
    }

    _showNumbersOfLikes(likeButton, showLikesElement) {
        if (!likeButton.classList.contains("element__like_active")) {
            api
                .addLike(this._card._id)
                .then((result) => {
                    likeButton.classList.add("element__like_active");
                    console.log(result);
                    this._addNumbersOfLikes(showLikesElement, result.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api
                .removeLike(this._card._id)
                .then((result) => {
                    likeButton.classList.remove("element__like_active");
                    console.log(result);
                    this._addNumbersOfLikes(showLikesElement, result.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
