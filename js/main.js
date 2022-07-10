import './switching-activity.js';
import { addMarker, clearGroupMarkers } from './map-init.js';
import { addEventSubmitToForm } from './form-validate.js';
import { getData } from './net-api.js';

// Добавляем обработчик отправки формы
addEventSubmitToForm(() => { });

// Получаем данные с сервера и добавляем на карту
getData((advs) => advs.forEach(addMarker));