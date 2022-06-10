
/**
  *Положительное целое число из диапазона [min; max]
  *undefined, если подходящих значений нет.
  */
const getRandomInt = (min, max) => {
  min = (min < 0) ? 0 : min;
  min = Math.ceil(min);
  max = Math.floor(max);
  const difference = max - min;
  if (difference >= 0 && max >= 0) {
    return Math.floor(min + Math.random() * (difference + 1));
  }
};

/**
  *Положительное число с плавающей точкой из диапазона [min;max]
  * и digits "кол-вом знаков после запятой",
  *undefined если подходящих значений нет.
  */
const getRandomFloat = (min, max, digits) => {
  min = (min < 0) ? 0 : min;
  const factor = Math.pow(10, digits);
  min = Math.ceil(min * factor);
  max = Math.floor(max * factor);
  const difference = max - min;
  if (difference >= 0 && max >= 0) {
    return Math.floor(min + Math.random() * (difference + 1)) / factor;
  }
};

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
      title: ADVERT_TITLES[getRandomInt(0, ADVERT_TITLES.length - 1)],
      address: `${lat}, ${lng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: PLACE_TYPES[getRandomInt(0, PLACE_TYPES.length - 1)],
      rooms: getRandomInt(1, MAX_ROOM_COUNT),
      guests: getRandomInt(1, MAX_GUEST_COUNT),
      checkin: CHECK_INOUT_TIMES[getRandomInt(0, CHECK_INOUT_TIMES.length - 1)],
      checkout: CHECK_INOUT_TIMES[getRandomInt(0, CHECK_INOUT_TIMES.length - 1)],
      features: createRandomLenghtList(FEATURES),
      description: ROOM_DESCRIPTIONS[getRandomInt(0, ROOM_DESCRIPTIONS.length - 1)],
      photos: createRandomLenghtList(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

// Генерация массива данных
// eslint-disable-next-line no-unused-vars
const similarAdverts = Array.from({ length: SIMILAR_ADVERT_COUNT }, createAdvert);
