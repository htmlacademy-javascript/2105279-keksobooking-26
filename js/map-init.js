import { enableActivity } from './switching-activity.js';
import { createCard } from './create-card.js';

const ADDRESS_BEGIN = {
  lat: 35.67500,
  lng: 139.75000
};

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const newIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Инициализация карты
const map = L.map('map-canvas')
  .on('viewreset', enableActivity)
  .setView(ADDRESS_BEGIN, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// Добавление маркера для выбора адреса
const newMarker = L.marker(
  ADDRESS_BEGIN,
  {
    draggable: true,
    icon: newIcon,
  },
);
newMarker.addTo(map);

// Добавление слоя для маркеров с объявлениями
const markerGroup = L.layerGroup().addTo(map);

/** Возрат маркера в центральное положение */
const resetNewMarker = () => newMarker.setLatLng(map.getCenter());

// Добавление маркеров на карту
const createMarker = (location, popupElement) => {
  L.marker(location, { icon: icon },)
    .addTo(markerGroup)
    .bindPopup(popupElement);
};

/** Создание и добавление маркера на карту */
const addMarker = (adv) => createMarker(adv.location, createCard(adv));

/** Удаление маркеров с карты */
const clearGroupMarkers = () => markerGroup.clearLayers();

export { addMarker, clearGroupMarkers, resetNewMarker, newMarker };

