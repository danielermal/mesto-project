import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupImage, popupImageTitle, popupSelector) {
        super(popupSelector)
        this.popupImage = popupImage
        this.popupImageTitle = popupImageTitle
    }

    openPopup(card) {
        this.popupImage.src = card.link
        this.popupImage.alt = card.name
        this.popupImageTitle.textContent = card.name
        super.openPopup()
    }
}
