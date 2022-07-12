import { enableSubmitButton, disableSubmitButton } from './switching-activity.js';
import { addMarker, clearNewMarker } from './map-init.js';
import { addEventSubmitToForm, formElement } from './form-validate.js';
import { getData, sendData } from './net-api.js';
import { showSuccessMessage, createErrorDialog } from './messages.js';

// Добавляем обработчик отправки формы
const sendSdvData = () => {
  disableSubmitButton();
  sendData(() => {
    showSuccessMessage();
    enableSubmitButton();
    clearNewMarker();
  }, createErrorDialog('#error', sendSdvData, enableSubmitButton), new FormData(formElement));
};
addEventSubmitToForm(sendSdvData);

// Получаем данные с сервера и добавляем на карту
const getAdvData = () => getData((advs) => {
  advs.forEach(addMarker);
}, createErrorDialog('#error_load', getAdvData, () => { }));
getAdvData();
