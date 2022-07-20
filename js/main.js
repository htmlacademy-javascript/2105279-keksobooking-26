import { enableSubmitButton, disableSubmitButton, enableFilter, disableFilter, enableForm } from './switching-activity.js';
import { map, getAddressBegin } from './map-init.js';
import { addMarker, clearGroupMarkers } from './map-marker.js';
import { addEventSubmitToForm, getFormData, resetForm } from './form-validate.js';
import { filterData, addEventUpdateFilter, resetFilter } from './filter-data.js';
import { getData, sendData } from './net-api.js';
import { createMessage } from './messages.js';
import { debounce } from './debounce.js';

const resetElement = document.querySelector('.ad-form__reset');

let dataAdvs = [];

// Обработчик обновления маркеров
const onMarkerUpdate = () => {
  clearGroupMarkers();
  filterData(dataAdvs).forEach(addMarker);
};
addEventUpdateFilter(debounce(onMarkerUpdate));

// Перевод страницы в начальное состояние
const onrResetPage = () => {
  resetForm();
  resetFilter();
  onMarkerUpdate();
};
resetElement.addEventListener('click', onrResetPage);

// Добавляем обработчик отправки формы
const onSendData = () => {
  disableSubmitButton();
  sendData(
    () => {
      createMessage('#success');
      enableSubmitButton();
      onrResetPage();
    },
    () => createMessage('#error', onSendData, enableSubmitButton),
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
    () => createMessage('#error_load', onGetData, disableFilter));
};

// Инициализация карты
map
  .on('viewreset', onGetData)
  .setView(getAddressBegin(), 13);
