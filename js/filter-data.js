const MAX_VIEW_ADV = 10;
const TYPE_HOUSE_DEFAULT = 'any';
const PRICE_HOUSE_DEFAULT = 'any';
const ROOM_COUNT_DEFAULT = 'any';
const GUEST_COUNT_DEFAULT = 'any';

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
const isTypeHouse = (adv) => (typeHouseElement.value === TYPE_HOUSE_DEFAULT || adv.offer.type === typeHouseElement.value);
const isPriceLimit = (value) => (PRICE_LIMIT[priceHouseElement.value][0] <= value && PRICE_LIMIT[priceHouseElement.value][1] > value);
const isPriceHouse = (adv) => adv.offer.price ? isPriceLimit(adv.offer.price) : priceHouseElement.value === PRICE_HOUSE_DEFAULT;
const isRoomCount = (adv) => (roomCountElement.value === ROOM_COUNT_DEFAULT || adv.offer.rooms === +roomCountElement.value);
const isGuestCount = (adv) => (guestCountElement.value === GUEST_COUNT_DEFAULT || adv.offer.guests === +guestCountElement.value);
const isFeature = (adv) => adv.offer.features ?
  checkedFeatures.every((element) => adv.offer.features.some((feature) => element.value === feature)) :
  !checkedFeatures.length;

const filterData = (advs) => {
  checkedFeatures = featureElements.filter((element) => element.checked);
  const result = [];
  for (const adv of advs) {
    if (
      isTypeHouse(adv) &&
      isPriceHouse(adv) &&
      isRoomCount(adv) &&
      isGuestCount(adv) &&
      isFeature(adv)
    ) {
      result.push(adv);
      if (result.length === MAX_VIEW_ADV) {
        return result;
      }
    }
  }
  return result;
};

const resetFilter = () => {
  typeHouseElement.value = TYPE_HOUSE_DEFAULT;
  priceHouseElement.value = PRICE_HOUSE_DEFAULT;
  roomCountElement.value = ROOM_COUNT_DEFAULT;
  guestCountElement.value = GUEST_COUNT_DEFAULT;
  featureElements.forEach((element) => {
    element.checked = false;
  });
};

/** Добавляет действие к событию для случая изменения фильтра */
const addEventUpdateFilter = (onUpdate) => formFilterElement.addEventListener('change', onUpdate);

export { addEventUpdateFilter, filterData, resetFilter };
