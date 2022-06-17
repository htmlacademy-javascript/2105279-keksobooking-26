const adForm = document.querySelector('form.ad-form');
const adFormList = document.querySelectorAll('form.ad-form fieldset');
const mapFiltersForm = document.querySelector('form.map__filters');
const mapFiltersList = document.querySelectorAll('.map__filters select, .map__filters fieldset');

/**
 * Переводит страницу в неактивное состояние
 */
const disableActivity = () => {
  adForm.classList.add('ad-form--disabled');
  adFormList.forEach((element) => element.setAttribute('disabled', ''));
  mapFiltersForm.classList.add('ad-form--disabled');
  mapFiltersList.forEach((element) => element.setAttribute('disabled', ''));
};

/**
 * Переводит страницу в активное состояние
 */
const enableActivity = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormList.forEach((element) => element.removeAttribute('disabled'));
  mapFiltersForm.classList.remove('ad-form--disabled');
  mapFiltersList.forEach((element) => element.removeAttribute('disabled'));
};

// По умолчанию страница в неактивном состоянии
disableActivity();

export { disableActivity, enableActivity };
