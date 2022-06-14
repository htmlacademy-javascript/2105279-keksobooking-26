import { getRandomInt, getRandomFloat, getRandomItem } from './util.js';

//Константы для генерации данных
const SIMILAR_ADVERT_COUNT = 10;
const MAX_ROOM_COUNT = 5;
const MAX_GUEST_COUNT = 6;
const MIN_PRICE = 2000;
const MAX_PRICE = 65000;

// Заголовки объявлений
const ADVERT_TITLES = [
  'Тихое местечко',
  'Роскошные апартаменты',
  'Удобное жильё',
  'Элитное жильё',
  'Ночлег',
];

// Описание помещения
const ROOM_DESCRIPTIONS = [
  'Помещение с хорошим ремонтом. Отдельная входная группа. Удобные подъездные пути.',
  'Помещение в самом оживленном месте.В самом центре всех туристических потоков города.',
  'Помещение расположено на первой линии, в 50 метрах от выхода из метро и основной транспортной развязки города.',
  'С хорошим ремонтом, высокими потолками, прекрасный обзор.',
  'В шаговой доступности остановки общественного транспорта.',
  'Помещение имеет санузел и балкон, имеет свой вход. Помещение очень теплое и сухое.',
  'Популярное место отдыха для горожан и гостей города.Территория закрытая и охраняемая, установлено видеонаблюдение.',
  'Здание имеет 3 этажа (+цоколь), в котором расположен ресторанный комплекс, сауна, на прилегающей территории построены уютные кабинки (павильоны), мангал. Комплекс огорожен.',
];

const PLACE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_INOUT_TIMES = ['12: 00', '13: 00', '14: 00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 *Генерирует массив случайной длинны с неповроряющемися значениями, на основе списка допустимых значений
 */
const createRandomLenghtList = (sourceList) => {
  const results = [];
  for (let i = 0; i < sourceList.length; i++) {
    if (Math.random() > 0.5) {
      results.push(sourceList[i]);
    }
  }
  return results;
};

/**
 *Возврвщает форматированную строку адреса.
  */
const createAvatarAdress = (index) => `./img/avatars/user${index > 9 ? '' : '0'}${index}.png`;

/**
 *Возврвщает сгененированый объект с "объявлением"
  */
const createAdvert = (_value, index) => {
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: createAvatarAdress(index)
    },
    offer: {
      title: getRandomItem(ADVERT_TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomItem(PLACE_TYPES),
      rooms: getRandomInt(1, MAX_ROOM_COUNT),
      guests: getRandomInt(1, MAX_GUEST_COUNT),
      checkin: getRandomItem(CHECK_INOUT_TIMES),
      checkout: getRandomItem(CHECK_INOUT_TIMES),
      features: createRandomLenghtList(FEATURES),
      description: getRandomItem(ROOM_DESCRIPTIONS),
      photos: createRandomLenghtList(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

// Генерация массива данных
const similarAdverts = Array.from({ length: SIMILAR_ADVERT_COUNT }, createAdvert);

export { similarAdverts };
