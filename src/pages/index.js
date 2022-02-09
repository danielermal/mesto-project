import './index.css';

import { FormValidator } from '../components/FormValidator.js';

import { Card } from '../components/Сard.js'

import { editButton, addButton, changeAvatarButton, avatar, validConfig, popupAddCard, popupEditProfile, popupEditAvatar } from '../utils/constants.js'

import { api } from '../components/Api.js'

import Section from '../components/Section';

import { Popup } from '../components/Popup';

import { PopupWithImage } from '../components/PopupWithImage';

import { PopupWithForm } from '../components/PopupWithForm';

import { UserInfo } from '../components/UserInfo';

export let userId

const popupChangeProfile = new PopupWithForm({
  formSelector: '.popup__form_profile',
  inputSelector: '.popup__text-input',
  buttonTextSelector: '.popup__save-text',
  loadingElementSelector: '.popup__loading'
}, '.popup_profile')

const popupCard = new PopupWithForm({
  inputSelector: '.popup__text-input',
  buttonTextSelector: '.popup__save-text',
  loadingElementSelector: '.popup__loading'
}, '.popup_add-photo')

const popupChangeAvatar = new PopupWithForm({
  inputSelector: '.popup__text-input',
  buttonTextSelector: '.popup__save-text',
  loadingElementSelector: '.popup__loading'
}, '.popup_change-avatar')

api
    .getInitialProfile()
    .then((result) => {
        console.log(result);
        new UserInfo({
            nameSelector: '.profile__title',
            aboutSelector: '.profile__subtitle',
            avatarSelector: '.profile__img',
            userInfo: result,
            nameInFormSelector: '#name',
            aboutInFormSelector: '#hobbie'
        }).getUserInfo()
        userId = result._id;
        // добавляем готовые карточки
        api.getInitialCards().then((result) => {
            console.log(result);
            const cardList = new Section({
                items: result,
                renderer: (item) => {
                    const card = new Card(item, userId, '.photo__template', {
                      handleCardClick: (link, name, card) => {
                        const cardPopup = new PopupWithImage(link, name, '.popup_photo')
                        cardPopup.openPopup(card)
                        cardPopup.setEventListeners()
                      }
                    }, '.popup__image', '.popup__image-title', api)
                    const cardElement = card.getCard()
                    cardList.setItem(cardElement)
                }
            }, '.elements');
            cardList.addItems()
        });
        return userId;
    })
    .catch((err) => {
        console.log(err);
    });

editButton.addEventListener('click', () => popupChangeProfile.openPopup());
addButton.addEventListener('click', () => popupCard.openPopup());
changeAvatarButton.addEventListener('click', () => popupChangeAvatar.openPopup())

// //Как мне кажется это не правильно, но для теста подойдет
// addButton.addEventListener('click', () => {
//     validAddCard.removeAllErrors();
//     validAddCard.disableSubmitButton();
//     //по правильному их надо подключить в момент открытия экземпляра попапа
// })

// const validation = new FormValidator({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__text-input',
//     buttonSelector: '.popup__save'
// })

// validation.enableValidation()

//Навешиваем Валидацию:
//добавление карточки
const validAddCard = new FormValidator(validConfig, popupAddCard);
validAddCard.enableValidation();
//профиль
const validProfile = new FormValidator(validConfig, popupEditProfile);
validProfile.enableValidation();
//аватар
const validAvatar = new FormValidator(validConfig, popupEditAvatar);
validAvatar.enableValidation();
// замена данных профиля при сабмите
const changeProfileForm = new PopupWithForm({
    submitForm: (evt) => {
        evt.preventDefault()
        popupChangeProfile.renderLoading(true, 'Сохранение')
        const values = popupChangeProfile.getInputValues()
        console.log(values)
        validProfile.removeValidErrors();
        validProfile.disableSubmitButton();
        api.changeProfile(values.name, values.hobbie)
        .then((result) => {
          new UserInfo({
            nameSelector: '.profile__title',
            aboutSelector: '.profile__subtitle',
            nameInFormSelector: '#name',
            aboutInFormSelector: '#hobbie',
          }).setUserInfo(result)
          popupChangeProfile.closePopup(false)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupChangeProfile.renderLoading(false, 'Сохранить')
        })
    },
    formSelector: '.popup__form_profile',
    inputSelector: '.popup__text-input'
}, '.popup_profile')

changeProfileForm.setEventListeners()

// добавление карточки при сабмите
const addCardForm = new PopupWithForm({
    submitForm: (evt) => {
        evt.preventDefault()

        popupCard.renderLoading(true, 'Создание')
        const values = popupCard.getInputValues()
        console.log(values)
        validAddCard.removeValidErrors();
        validAddCard.disableSubmitButton();
        api.addNewCard(values.place, values.link)
            .then((result) => {
                const newCard = new Section({}, '.elements');
                newCard.setItem(new Card(result, userId, '.photo__template', {
                  handleCardClick: (link, name, card) => {
                    const cardPopup = new PopupWithImage(link, name, '.popup_photo')
                    cardPopup.openPopup(card)
                    cardPopup.setEventListeners()
                  }
                }, '.popup__image', '.popup__image-title', api).getCard())
                popupCard.closePopup(true) //закрывается верно, в теле запроса
                    //validation.enableValidation()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
              popupCard.renderLoading(false, 'Создать')
            })
    },
    formSelector: '.form__photo',
    inputSelector: '.popup__text-input'
}, '.popup_add-photo')
addCardForm.setEventListeners()

// замена аватара при сабмите
const changeAvatarForm = new PopupWithForm({
    submitForm: (evt) => {
        evt.preventDefault()

        popupChangeAvatar.renderLoading(true, 'Сохранение')
        const values = popupChangeAvatar.getInputValues()
        console.log(values)
        validAvatar.removeValidErrors();
        validAvatar.disableSubmitButton();
        api.changeAvatar(values.avatar)
            .then((result) => {
                avatar.src = result.avatar
                console.log(result)
                popupChangeAvatar.closePopup(true) //закрывается верно, в теле запроса
                    //validation.enableValidation()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
              popupChangeAvatar.renderLoading(false, 'Сохранить')
            })
    },
    formSelector: '.popup__form_avatar',
    inputSelector: '.popup__text-input'
}, '.popup_change-avatar')
changeAvatarForm.setEventListeners()
