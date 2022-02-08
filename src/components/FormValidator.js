export class FormValidator {
    constructor(validConfig, validFormElement) {
        this._formSelector = validConfig.formSelector;
        this._inputSelector = validConfig.inputSelector;
        this._buttonSelector = validConfig.buttonSelector;
        this._validFormElement = validFormElement;
        this._validInputList = Array.from(this._validFormElement.querySelectorAll(this._inputSelector));
        this._ValidSubmitButton = this._validFormElement.querySelector(this._buttonSelector);
        this._validInactiveButton = validConfig.validInactiveButton;
        this._validInputError = validConfig.validInputError;
    }
    _hasInvalidInput() { //
        return this._validInputList.some((validElement) => {
            return !validElement.validity.valid;
        });
    };
    disableSubmitButton() { //
        this._ValidSubmitButton.classList.add(this._validInactiveButton);
        this._ValidSubmitButton.disabled = true;
    }

    enableSubmitButton() { //
        console.log(this._validInactiveButton);
        this._ValidSubmitButton.classList.remove(this._validInactiveButton);
        this._ValidSubmitButton.disabled = false;
    }


    _hideInputError(validElement) { //
        const validError = this._validFormElement.querySelector(`#${validElement.id}-error`);
        //console.log(`#${validElement.id}-error`);
        validElement.classList.remove(this._validInputError);
        validError.textContent = '';
    }
    _setEventListeners() { //
        this._validFormElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._toggleValidButton();
        this._validInputList.forEach((validElement) => {

            validElement.addEventListener('input', () => {
                this._checkInputValidity(validElement);
                this._toggleValidButton();
            });
        });
    }
    removeValidErrors() { //
        this._validInputList.forEach((validElement) => {
            this._hideInputError(validElement);
        });
    }
    enableValidation() { //
        this._setEventListeners();
    }
    _checkInputValidity(validElement) { //
        if (validElement.validity.valid) {
            this._hideInputError(validElement);
        } else {
            this._showInputError(validElement);
        }
    }
    _showInputError(validElement) { //
        const errorElement = this._validFormElement.querySelector(`#${validElement.id}-error`);
        validElement.classList.add(this._validInputError);
        errorElement.textContent = validElement.validationMessage;
        //console.log(validElement.validationMessage);
    }
    _toggleValidButton() { //
            if (this._hasInvalidInput()) {
                this.disableSubmitButton();
            } else {
                this.enableSubmitButton();
            }
        }
        // enableValidation() {
        //     Array.from(document.querySelectorAll(this.formSelector)).forEach((formElement) => {
        //         formElement.addEventListener('submit', (evt) => {
        //             evt.preventDefault();
        //         });
        //         const getInputList = Array.from(formElement.querySelectorAll(this.inputSelector))
        //         const saveButton = formElement.querySelector(this.buttonSelector)
        //         this._disabledButton(getInputList, saveButton)
        //         getInputList.forEach((inputElement) => {
        //             inputElement.addEventListener('input', () => {
        //                 this._checkInputValidity(inputElement)
        //                 this._disabledButton(getInputList, saveButton)
        //             })
        //         })
        //     })
        // }

    // _checkInputValidity(input) {
    //     if (!input.validity.valid) {
    //         this._showError(input, input.validationMessage)
    //     } else {
    //         this._hideError(input)
    //     }
    // }

    // _showError(input, errorMessage) {
    //     input.classList.add(`${input.classList[0]}_type_error`)
    //     const inputError = input.nextElementSibling
    //     inputError.textContent = errorMessage
    //     inputError.classList.add(`${inputError.classList[0]}_active`)
    // }

    // _hideError(input) {
    //     input.classList.remove(`${input.classList[0]}_type_error`)
    //     const inputError = input.nextElementSibling
    //     inputError.textContent = ''
    //     inputError.classList.remove(`${inputError.classList[0]}_active`)
    // }

    // _disabledButton(inputList, saveButton) {
    //     console.log('1')
    //     if (inputList.every((inputElement) => inputElement.validity.valid)) {
    //         saveButton.classList.remove(`${saveButton.classList[0]}_disabled`)
    //         saveButton.disabled = 0
    //     } else {
    //         saveButton.classList.add(`${saveButton.classList[0]}_disabled`)
    //         saveButton.disabled = 1
    //     }
    // }
}
