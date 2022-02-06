import { api } from "./Api.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { popupImage, popupImageTitle } from "../utils/constants.js";


export class Card {
    constructor(card, id, selector) {
        this.card = card;
        this.id = id;
        this.selector = selector;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this.selector)
            .content.querySelector(".element")
            .cloneNode(true);
        return cardElement;
    }

    getCard() {
        this.element = this._getElement();
        this.element.querySelector(".element__title").textContent = this.card.name;
        const cardImage = this.element.querySelector(".element__img");
        cardImage.src = this.card.link;
        cardImage.alt = this.card.name;
        this._deleteCard(this.element);
        this._showLikesElement(this.element);
        this._handleCardClick(cardImage);
        return this.element;
    }

    _deleteCard(element) {
        if (this.id === this.card.owner._id) {
            this._addDeleteButton(element, this._createDeleteButton()).addEventListener(
                "click",
                () => {
                    api
                        .removeCard(this.card._id)
                        .then((res) => {
                            console.log(res);
                            element.remove();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            );
        }
    }

    _showLikesElement(element) {
        // показываем количество лайков
        const cardNumbersOfLikes = element.querySelector(
            ".element__numbers-of-likes"
        );
        // ставим лайк
        const cardLikeButton = element.querySelector(".element__like");
        this._addNumbersOfLikes(
            cardNumbersOfLikes,
            this.card.likes,
            this.id,
            cardLikeButton
        );
        cardLikeButton.addEventListener("click", (evt) => {
            this._showNumbersOfLikes(
                cardLikeButton,
                cardNumbersOfLikes,
                this.card._id
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

    _addDeleteButton(container, markup) {
        container.insertAdjacentHTML("beforeend", markup);
        const deleteButton = container.querySelector(".element__delete");
        return deleteButton;
    }

    _showNumbersOfLikes(likeButton, showLikesElement) {
        if (!likeButton.classList.contains("element__like_active")) {
            api
                .addLike(this.card._id)
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
                .removeLike(this.card._id)
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

    _handleCardClick(cardImage) {
        cardImage.addEventListener('click', (evt) => {
            const cardPopup = new PopupWithImage(popupImage, popupImageTitle, this.card, '.popup_photo').openPopup()
        })
    }
}
