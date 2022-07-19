import { map } from './map-init.js';
import { createCard } from './create-card.js';

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Добавление слоя для маркеров с объявлениями
const markerGroup = L.layerGroup().addTo(map);

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

export { addMarker, clearGroupMarkers };
