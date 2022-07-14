import { enableSubmitButton, disableSubmitButton } from './switching-activity.js';
import { addMarker, resetNewMarker } from './map-init.js';
import { addEventSubmitToForm, getFormData, onResetForm } from './form-validate.js';
import { getData, sendData } from './net-api.js';
import { showSuccessMessage, createErrorDialog } from './messages.js';

// Добавляем обработчик отправки формы
const onSendData = () => {
  disableSubmitButton();
  sendData(() => {
    showSuccessMessage();
    enableSubmitButton();
    resetNewMarker();
    onResetForm();
  }, () => createErrorDialog('#error', onSendData, enableSubmitButton), getFormData());
};
addEventSubmitToForm(onSendData);

// Получаем данные с сервера и добавляем на карту
const getAdvData = () => getData((advs) => {
  advs.forEach(addMarker);
}, () => createErrorDialog('#error_load', getAdvData, () => { }));
getAdvData();
