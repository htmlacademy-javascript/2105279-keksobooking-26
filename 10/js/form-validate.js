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


// Валидация с помощью библиатеки Pristine

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element--validate',
  errorTextParent: 'ad-form__element--validate',
  errorTextClass: 'ad-form__error'
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// Проверка цены за ночь и подключение слайдера

const typeHouse = document.querySelector('#type');
const priceHouse = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

const getMinCost = () => MIN_COST[typeHouse.value];
const getCostErrorMessage = () => `${TRANSLATE_TYPE_HOUSE[typeHouse.value]} не дешевле ${getMinCost()}`;

pristine.addValidator(priceHouse, (value) => (value >= getMinCost()), getCostErrorMessage);

noUiSlider.create(slider, {
  range: {
    min: 0,
    '40%': 5000,
    '60%': 10000,
    max: 100000,
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

typeHouse.addEventListener('input', () => {
  priceHouse.placeholder = getMinCost();
  slider.noUiSlider.updateOptions({
    padding: [getMinCost(), 0]
  });
  if (priceHouse.value) {
    pristine.validate(priceHouse);
  }
});

priceHouse.addEventListener('input', () => {
  slider.noUiSlider.set(priceHouse.value);
});

slider.noUiSlider.on('slide', () => {
  priceHouse.value = slider.noUiSlider.get();
  pristine.validate(priceHouse);
});

// Синхронизация количества комнат и мест

const roomCount = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityOptionList = capacity.children;

// Подходит ли опция по количеству мест, выбранному количеству комнат
const isCorrectCapacity = (capacityValue) => CAPACITY_OPTIONS[roomCount.value].some((value) => (+capacityValue === +value));

// Запретить выбор неподходящего числа мест
const selectCapacityOption = () => {
  for (let i = 0; i < capacityOptionList.length; i++) {
    const capacityOption = capacityOptionList[i];
    if (isCorrectCapacity(capacityOption.value)) {
      capacityOption.removeAttribute('disabled');
    } else {
      capacityOption.setAttribute('disabled', '');
    }
  }
};

selectCapacityOption();

pristine.addValidator(capacity, (value) => isCorrectCapacity(value), 'Это не подходит');

roomCount.addEventListener('input', () => {
  selectCapacityOption();
  pristine.validate(capacity);
});


// Синхронизация времени въезда и выезда

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('input', () => (timeout.value = timein.value));
timeout.addEventListener('input', () => (timein.value = timeout.value));
