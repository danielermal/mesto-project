import { config } from "../utils/constants.js"

class Api {
  constructor ({baseUrl, headers}) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialProfile () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  getInitialCards = () => {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  changeProfile (name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  addNewCard (name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  removeCard (id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  addLike (id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  removeLike (id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse)
  }

  changeAvatar (avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }

}

export const api = new Api (config)
