const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '05f82657-01f1-41e6-be67-f457afff82d0',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const changeProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers:config.headers
  })
  .then(checkResponse)
}

export const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers:config.headers
  })
  .then(checkResponse)
}

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers:config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(checkResponse)
}
