import { enableSubmitButton, disableSubmitButton } from './switching-activity.js';
import { addMarker, clearGroupMarkers } from './map-init.js';
import { addEventSubmitToForm } from './form-validate.js';
import { getData, sendData } from './net-api.js';
import { showSuccessMessage, createErrorDialog } from './messages.js';

// Добавляем обработчик отправки формы
const formElement = document.querySelector('.ad-form');
addEventSubmitToForm(() => {
  disableSubmitButton();
  sendData(() => {
    showSuccessMessage();
    enableSubmitButton();
  },
    createErrorDialog('#error', () => formElement.onsubmit()), new FormData(formElement));
});

// Получаем данные с сервера и добавляем на карту
const getAdvData = () => getData((advs) => {
  advs.forEach(addMarker);
},
  createErrorDialog('#error_load', getAdvData));
getAdvData();
