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

// Добавление нового маркера и связывание его с формой

const newMarker = L.marker(
  ADDRESS_BEGIN,
  {
    draggable: true,
    icon: newIcon,
  },
);

newMarker.addTo(map);


const address = document.querySelector('#address');
newMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat}, ${lng}`;
});

// Возрат маркера в исходное положение
const clearNewMarker = () => newMarker.setLatLng(ADDRESS_BEGIN);

// Генерация тестовых данных и добавление маркеров на карту

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (location, element) => {
  L.marker(location, { icon },)
    .addTo(markerGroup)
    .bindPopup(element);
};

/** Создание и добавление маркера на карту */
const addMarker = (adv) => createMarker(adv.location, createCard(adv));

/** Удаление маркеров с карты */
const clearGroupMarkers = () => markerGroup.clearLayers();


export { addMarker, clearGroupMarkers, clearNewMarker };
