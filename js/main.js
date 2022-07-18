import { enableSubmitButton, disableSubmitButton, enableFilter, disableAFilter, enableForm } from './switching-activity.js';
import { map, getAddressBegin } from './map-init.js';
import { addMarker, clearGroupMarkers } from './map-marker.js';
import { addEventSubmitToForm, getFormData, onResetForm } from './form-validate.js';
import { filterData, addEventUpdateFilter } from './filter-data.js';
import { getData, sendData } from './net-api.js';
import { showSuccessMessage, createErrorDialog } from './messages.js';
import { debounce } from './debounce.js';

let dataAdvs = [];

// Обработчик обновления маркеров
const onMarkerUpdate = () => {
  clearGroupMarkers();
  filterData(dataAdvs).forEach(addMarker);
};
addEventUpdateFilter(debounce(onMarkerUpdate));

// Добавляем обработчик отправки формы
const onSendData = () => {
  disableSubmitButton();
  sendData(
    () => {
      showSuccessMessage();
      enableSubmitButton();
      onResetForm();
    },
    () => createErrorDialog('#error', onSendData, enableSubmitButton),
    getFormData());
};
addEventSubmitToForm(onSendData);

// Получаем данные с сервера и добавляем на карту
const onGetData = () => {
  enableForm();
  getData(
    (data) => {
      dataAdvs = data;
      onMarkerUpdate();
      enableFilter();
    },
    () => createErrorDialog('#error_load', onGetData, disableAFilter));
};

// Инициализация карты
map
  .on('viewreset', onGetData)
  .setView(getAddressBegin(), 13);
