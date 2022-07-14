import { newMarker } from './map-init.js';

const MIN_COST = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const TRANSLATE_TYPE_HOUSE = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'hotel': 'Отель',
  'house': 'Дом',
  'palace': 'Дворец'
};

const CAPACITY_OPTIONS = {
  '1': [1],       // 1 комната — «для 1 гостя»;
  '2': [1, 2],    // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
  '3': [1, 2, 3], // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
  '100': [0],     // 100 комнат — «не для гостей».
};

const MAX_COST = 100000;

// Получение элементов формы

const formElement = document.querySelector('.ad-form');
const resetElement = document.querySelector('.ad-form__reset');
const typeHouseElement = document.querySelector('#type');
const priceHouseElement = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const roomCountElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const addressElement = document.querySelector('#address');
const capacityOptionElements = capacityElement.children;

// Инициализация валидации с помощью библиатеки Pristine
const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element--validate',
  errorTextParent: 'ad-form__element--validate',
  errorTextClass: 'ad-form__error'
});

// Вспомогательные функции

/** Минимальная цена за ночь */
const getMinCost = () => MIN_COST[typeHouseElement.value];
/** Возвращает текст ошибки */
const getCostErrorMessage = () => `${TRANSLATE_TYPE_HOUSE[typeHouseElement.value]} не дешевле ${getMinCost()}`;

// Подключение и привязка слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    '40%': 5000,
    '60%': 10000,
    max: MAX_COST,
  },
  padding: [getMinCost(), 0],
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

sliderElement.noUiSlider.on('slide', () => {
  priceHouseElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceHouseElement);
});

priceHouseElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceHouseElement.value);
});

// Привязка поля адрес к маркеру на карте
newMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressElement.value = `${lat}, ${lng}`;
});

// Проверка цены за ночь
pristine.addValidator(priceHouseElement, (value) => (value >= getMinCost()), getCostErrorMessage);

const onImputTypeHouse = () => {
  priceHouseElement.placeholder = getMinCost();
  sliderElement.noUiSlider.updateOptions({
    padding: [getMinCost(), 0]
  });
  if (priceHouseElement.value) {
    pristine.validate(priceHouseElement);
  }
};

typeHouseElement.addEventListener('input', onImputTypeHouse);


// Подходит ли опция по количеству мест, выбранному количеству комнат
const isCorrectCapacity = (capacityValue) => CAPACITY_OPTIONS[roomCountElement.value].some((value) => (+capacityValue === +value));

// Запретить выбор неподходящего числа мест
const onSelectCapacityOption = () => {
  for (const element of capacityOptionElements) {
    if (isCorrectCapacity(element.value)) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', '');
    }
  }
};

onSelectCapacityOption();

// Валидация количества комнат и мест
pristine.addValidator(capacityElement, (value) => isCorrectCapacity(value), 'Это не подходит');

roomCountElement.addEventListener('input', () => {
  onSelectCapacityOption();
  pristine.validate(capacityElement);
});

// Синхронизация времени въезда и выезда
timeinElement.addEventListener('input', () => (timeoutElement.value = timeinElement.value));
timeoutElement.addEventListener('input', () => (timeinElement.value = timeoutElement.value));


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

// Возрат формы в исходное состояние
const onResetForm = () => {
  formElement.reset();
  onImputTypeHouse();
  onSelectCapacityOption();
  pristine.reset();
};
resetElement.addEventListener('click', onResetForm);

export { addEventSubmitToForm, getFormData, onResetForm };
