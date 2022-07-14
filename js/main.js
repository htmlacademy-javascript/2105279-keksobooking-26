import { enableSubmitButton, disableSubmitButton, enableFilter, disableAFilter, enableForm } from './switching-activity.js';
import { map, getAddressBegin } from './map-init.js';
import { addMarker, clearGroupMarkers } from './map-marker.js';
import { addEventSubmitToForm, getFormData, onResetForm } from './form-validate.js';
import { filterData } from './filter-data.js';
import { getData, sendData } from './net-api.js';
import { showSuccessMessage, createErrorDialog } from './messages.js';

// Обработчик обновления маркеров
let dataAdvs;
const onMarkerUpdate = () => {
  clearGroupMarkers();
  filterData(dataAdvs).forEach(addMarker);
};

// Добавляем обработчик отправки формы
const onSendData = () => {
  disableSubmitButton();
  sendData(() => {
    showSuccessMessage();
    enableSubmitButton();
    onResetForm();
  }, () => createErrorDialog('#error', onSendData, enableSubmitButton), getFormData());
};
addEventSubmitToForm(onSendData);

// Получаем данные с сервера и добавляем на карту
const onGetAdvData = () => {
  enableForm();
  getData((data) => {
    dataAdvs = data;
    onMarkerUpdate();
    enableFilter();
  }, () => createErrorDialog('#error_load', onGetAdvData, disableAFilter));
};

map
  .on('viewreset', onGetAdvData)
  .setView(getAddressBegin(), 13);
