import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupImage, popupImageTitle, card, popupSelector) {
        super(popupSelector)
        this.popupImage = popupImage
        this.popupImageTitle = popupImageTitle
        this.title = card.name
        this.src = card.link
    }

    openPopup() {
        this.popupImage.src = this.src
        this.popupImage.alt = this.title
        this.popupImageTitle.textContent = this.title
        super.openPopup()
    }
}