import { map, getAddressBegin } from './map-init.js';
import { offerTypeToName } from './offer-type.js';

const FILE_TYPES = ['bmp', 'gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const MAIN_PIN_URL = 'img/main-pin.svg';
const PHOTO_PREVIEW_WIDTH = 300;

const typeToMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const roomToCapacitys = {
  '1': [1],       // 1 комната — «для 1 гостя»;
  '2': [1, 2],    // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
  '3': [1, 2, 3], // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
  '100': [0],     // 100 комнат — «не для гостей».
};

const MAX_COST = 100000;

// Получение элементов формы

const formElement = document.querySelector('.ad-form');
const houseTypeElement = document.querySelector('#type');
const housePriceElement = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const roomCountElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const addressElement = document.querySelector('#address');

const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const avatarChooserElement = document.querySelector('.ad-form__field [type="file"]');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const photoChooserElement = document.querySelector('.ad-form__upload [type="file"]');


// Загрузка и отображение изображений

/** Являеться ли файл допустимого типа*/
const isImageFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  if (isImageFile(file)) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  if (isImageFile(file)) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.width = PHOTO_PREVIEW_WIDTH;
    photoPreviewElement.innerHTML = '';
    photoPreviewElement.append(newPhoto);
  }
});

// Инициализация валидации с помощью библиатеки Pristine
const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element--validate',
  errorTextParent: 'ad-form__element--validate',
  errorTextClass: 'ad-form__error'
});

/** Минимальная цена за ночь */
const getMinCost = () => typeToMinPrice[houseTypeElement.value];
/** Возвращает текст ошибки */
const getCostErrorMessage = () => `${offerTypeToName[houseTypeElement.value]} не дешевле ${getMinCost()}`;

// Подключение и привязка слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_COST,
  },
  start: getMinCost(),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Сброс слайдера
const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: getMinCost(),
  });
};

sliderElement.noUiSlider.on('slide', () => {
  housePriceElement.value = sliderElement.noUiSlider.get();
  pristine.validate(housePriceElement);
});

housePriceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(housePriceElement.value);
});

// Создание маркера и привязка его к полю адрес

const newIcon = L.icon({
  iconUrl: MAIN_PIN_URL,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const newMarker = L.marker(
  getAddressBegin(),
  {
    draggable: true,
    icon: newIcon,
  },
);

newMarker.addTo(map);

const onMarkerMoveend = () => {
  const { lat, lng } = newMarker.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  pristine.validate(addressElement);
};
newMarker.on('moveend', onMarkerMoveend);

/** Возрат маркера в центральное положение */
const resetNewMarker = () => newMarker.setLatLng(getAddressBegin());

// Проверка цены за ночь
pristine.addValidator(housePriceElement, (value) => (value >= getMinCost()), getCostErrorMessage);

const onHouseTypeInput = () => {
  housePriceElement.placeholder = getMinCost();
  if (housePriceElement.value) {
    pristine.validate(housePriceElement);
  }
};
houseTypeElement.addEventListener('input', onHouseTypeInput);

// Подходит ли опция по количеству мест, выбранному количеству комнат
const matchCorrectCapacity = (capacityValue) => roomToCapacitys[roomCountElement.value].some((value) => (+capacityValue === +value));

// Валидация количества комнат и мест
pristine.addValidator(capacityElement, (value) => matchCorrectCapacity(value), 'Это не подходит');
roomCountElement.addEventListener('change', () => pristine.validate(capacityElement));

// Синхронизация времени въезда и выезда
timeinElement.addEventListener('input', () => { timeoutElement.value = timeinElement.value; });
timeoutElement.addEventListener('input', () => { timeinElement.value = timeoutElement.value; });

/** Добавляет действие к событию для случая успешной валидации */
const addEventSubmitToForm = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      onSuccess(evt);
    }
  });
};

// Получение данных формы
const getFormData = () => new FormData(formElement);

// Возрат формы и маркера в исходное состояние
const resetForm = () => {
  formElement.reset();
  pristine.reset();
  onHouseTypeInput();
  resetNewMarker();
  onMarkerMoveend();
  resetSlider();
  photoPreviewElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
  map.setView(getAddressBegin(), 13);
};

export { addEventSubmitToForm, getFormData, resetForm };
