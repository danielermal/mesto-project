import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupImageSelector, popupImageTitleSelector, popupSelector) {
        super(popupSelector)
        this.popupImage = document.querySelector(popupImageSelector)
        this.popupImageTitle = document.querySelector(popupImageTitleSelector)
    }

    openPopup(card) {
        this.popupImage.src = card.link
        this.popupImage.alt = card.name
        this.popupImageTitle.textContent = card.name
        super.openPopup()
    }
}
