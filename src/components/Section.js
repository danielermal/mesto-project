export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItem(element) {
        const card = this._renderer(element)
        this._container.prepend(card);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    addItems(items) {
        this._clear();

        items.forEach((item) => {
            this.setItem(item)
        });
    }
}
