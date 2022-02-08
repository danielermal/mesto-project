import './index.css';

import { FormValidator } from '../components/FormValidator.js';

import { Card } from '../components/Сard.js'

import { editButton, addButton, changeAvatarButton, avatar } from '../utils/constants.js'

import { api } from '../components/Api.js'

import Section from '../components/Section';

import { Popup } from '../components/Popup';

import { PopupWithForm } from '../components/PopupWithForm';

import { UserInfo } from '../components/UserInfo';

export let userId

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
                    const card = new Card(item, userId, '.photo__template')
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

editButton.addEventListener('click', () => new Popup('.popup_profile').openPopup());
addButton.addEventListener('click', () => new Popup('.popup_add-photo').openPopup());
changeAvatarButton.addEventListener('click', () => new Popup('.popup_change-avatar').openPopup())

const validation = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    buttonSelector: '.popup__save'
})

validation.enableValidation()

// замена данных профиля при сабмите
const changeProfileForm = new PopupWithForm({
    submitForm: (evt) => {
        evt.preventDefault()
        const form = new PopupWithForm({
            formSelector: '.popup__form_profile',
            inputSelector: '.popup__text-input',
            buttonTextSelector: '.popup__save-text',
            loadingElementSelector: '.popup__loading'
        }, '.popup_profile')
        form.renderLoading(true, 'Сохранение')

        new UserInfo({
            nameSelector: '.profile__title',
            aboutSelector: '.profile__subtitle',
            nameInFormSelector: '#name',
            aboutInFormSelector: '#hobbie',
            renderLoading: () => {
                form.closePopup(false)
                form.renderLoading(false, 'Сохранить')
            }
        }).setUserInfo()
    },
    formSelector: '.popup__form_profile',
    inputSelector: '.popup__text-input'
}, '.popup_profile')

changeProfileForm.setEventListeners()

// добавление карточки при сабмите
const addCardForm = new PopupWithForm({
    submitForm: (evt) => {
        evt.preventDefault()
        const form = new PopupWithForm({
            formSelector: '.form__photo',
            inputSelector: '.popup__text-input',
            buttonTextSelector: '.popup__save-text',
            loadingElementSelector: '.popup__loading'
        }, '.popup_add-photo')
        form.renderLoading(true, 'Создание')
        const values = form.getInputValues()
        console.log(values)
        api.addNewCard(values[0], values[1])
            .then((result) => {
                const newCard = new Section({}, '.elements');
                newCard.setItem(new Card(result, userId, '.photo__template').getCard())
                form.closePopup(true) //закрывается верно, в теле запроса
                validation.enableValidation()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                form.renderLoading(false, 'Создать')
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
        const form = new PopupWithForm({
            formSelector: '.popup__form_avatar',
            inputSelector: '.popup__text-input',
            buttonTextSelector: '.popup__save-text',
            loadingElementSelector: '.popup__loading'
        }, '.popup_change-avatar')
        form.renderLoading(true, 'Сохранение')
        const values = form.getInputValues()
        console.log(values)
        api.changeAvatar(values[0])
            .then((result) => {
                avatar.src = result.avatar
                console.log(result)
                form.closePopup(true) //закрывается верно, в теле запроса
                validation.enableValidation()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                form.renderLoading(false, 'Сохранить')
            })
    },
    formSelector: '.popup__form_avatar',
    inputSelector: '.popup__text-input'
}, '.popup_change-avatar')
changeAvatarForm.setEventListeners()