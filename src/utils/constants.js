export const editButton = document.querySelector('.profile__edit');
export const addButton = document.querySelector('.profile__add-button');
export const changeAvatarButton = document.querySelector('.profile__img-overlay')
export const popupAddCard = document.querySelector('.popup_add-photo');
export const popupEditProfile = document.querySelector('.popup_profile');
export const popupEditAvatar = document.querySelector('.popup_change-avatar');

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
    headers: {
        authorization: '05f82657-01f1-41e6-be67-f457afff82d0',
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

/*Конфиг Вадима */
// export const config = {
//     baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
//     headers: {
//         authorization: '69b55c42-ee88-4348-a639-420f0f40fb4f',
//         'Content-Type': 'application/json'
//     }
// };
export const validConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    buttonSelector: '.popup__save',
    validInactiveButton: 'popup__save_disabled',
    validInputError: '.popup__text-input-error'
}

