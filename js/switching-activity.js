const adFormElement = document.querySelector('form.ad-form');
const adFormElements = document.querySelectorAll('form.ad-form fieldset');
const mapFiltersElement = document.querySelector('form.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const sliderElement = document.querySelector('.ad-form__slider');
const buttonElement = document.querySelector('.ad-form__submit');

const enableSubmitButton = () => buttonElement.removeAttribute('disabled');
const disableSubmitButton = () => buttonElement.setAttribute('disabled', '');

/**
 * Переводит страницу в неактивное состояние
 */
const disableActivity = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => element.setAttribute('disabled', ''));
  mapFiltersElement.classList.add('ad-form--disabled');
  mapFiltersElements.forEach((element) => element.setAttribute('disabled', ''));
  sliderElement.setAttribute('disabled', '');
};

/**
 * Переводит страницу в активное состояние
 */
const enableActivity = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled'));
  mapFiltersElement.classList.remove('ad-form--disabled');
  mapFiltersElements.forEach((element) => element.removeAttribute('disabled'));
  sliderElement.removeAttribute('disabled');
};

// По умолчанию страница в неактивном состоянии
disableActivity();

export { disableActivity, enableActivity, enableSubmitButton, disableSubmitButton };
