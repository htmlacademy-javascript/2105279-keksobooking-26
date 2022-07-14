const PRICE_LIMIT = {
  any: [0, 100000],
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 100000]
};

const formFilterElement = document.querySelector('.map__filters');
const typeHouseElement = document.querySelector('#housing-type');
const priceHouseElement = document.querySelector('#housing-price');
const roomCountElement = document.querySelector('#housing-rooms');
const guestCountElement = document.querySelector('#housing-guests');
const featureElements = [...document.querySelectorAll('#housing-features [type="checkbox"]')];
let checkedFeatures = [];

// Функции соответствия фильтрам
const isTypeHouse = (adv) => (typeHouseElement.value === 'any' || adv.offer.type === typeHouseElement.value);
const isPriceLimit = (value) => (PRICE_LIMIT[priceHouseElement.value][0] <= value && PRICE_LIMIT[priceHouseElement.value][1] > value);
const isPriceHouse = (adv) => adv.offer.price ? isPriceLimit(adv.offer.price) : priceHouseElement.value === 'any';
const isRoomCount = (adv) => (roomCountElement.value === 'any' || adv.offer.rooms === +roomCountElement.value);
const isGuestCount = (adv) => (guestCountElement.value === 'any' || adv.offer.guests === +guestCountElement.value);
const isFeature = (adv) => {
  if (adv.offer.features !== undefined) {
    return checkedFeatures.every((type) => adv.offer.features.some((feature) => type === feature));
  }
  return checkedFeatures.length === 0;
};

const filterData = (data) => data
  .filter((adv) => isTypeHouse(adv) && isPriceHouse(adv) && isRoomCount(adv) && isGuestCount(adv) && isFeature(adv))
  .slice(0, 10);

// Обработчик обнавляющий массив особенностей для последующей фильтрации
const onUpdateCheckedFeatures = () => {
  checkedFeatures = Array.from(featureElements.filter((element) => element.checked), (element) => element.value);
};
formFilterElement.addEventListener('change', onUpdateCheckedFeatures);

/** Добавляет действие к событию для случая изменения фильтра */
const addEventUpdateFilter = (onUpdate) => formFilterElement.addEventListener('change', onUpdate);

export { addEventUpdateFilter, filterData };
