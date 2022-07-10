import './switching-activity.js';
import { addMarker, clearGroupMarkers } from './map-init.js';
import { addEventSubmitToForm } from './form-validate.js';
import { createAdverts } from './data.js';
import { getData } from './net-api.js';

// Добавляем обработчик отправки формы
addEventSubmitToForm(() => { });


// генерация данных
// const similarAdverts = createAdverts(10);
getData((advs) => advs.forEach(addMarker));