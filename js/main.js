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
const resetPage = () => {
  resetForm();
  resetFilter();
  onMarkerUpdate();
};
resetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

// Добавляем обработчик отправки формы
const onFormSubmit = () => {
  disableSubmitButton();
  sendData(
    () => {
      createMessage('#success');
      enableSubmitButton();
      resetPage();
    },
    () => createMessage('#error', enableSubmitButton, enableSubmitButton),
    getFormData());
};
addEventSubmitToForm(onFormSubmit);

// Получаем данные с сервера и добавляем на карту
const onMapLoad = () => {
  enableForm();
  getData(
    (data) => {
      dataAdvs = data;
      onMarkerUpdate();
      enableFilter();
      resetForm();
    },
    () => createMessage('#error_load', onMapLoad, disableFilter));
};

// Инициализация карты
map
  .on('load', onMapLoad)
  .setView(getAddressBegin(), 13);
