const offerTypeToName = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

let cardElement;
// Функция для замены содержимого данными, либо сокрытие элемента, если данных для него нет
const replaceTextContent = (selector, content, check = true) => {
  const element = cardElement.querySelector(selector);
  if (content && check) {
    element.textContent = content;
  }
  else {
    element.setAttribute('hidden', true);
  }
};

// Создание элемента с данными на основе шаблона
const createCard = ({ author, offer }) => {
  const { title, address, price, type, rooms, guests, checkin, checkout, description, features, photos } = offer;
  cardElement = cardAdvertTemplate.cloneNode(true);

  replaceTextContent('.popup__title', title);
  replaceTextContent('.popup__text--address', address);
  replaceTextContent('.popup__text--price span', price);
  if (!price) {
    replaceTextContent('.popup__text--price', price);
  }
  replaceTextContent('.popup__type', offerTypeToName[type]);
  replaceTextContent('.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`, !!rooms && !!guests);
  replaceTextContent('.popup__text--time', `Заезд после ${checkin}, выезд до ${checkout}`, !!checkin && !!checkout);
  replaceTextContent('.popup__description', description);

  // Удаление элементов списка не соответствюэших данным с списке 'особенностей'
  const featureElements = cardElement.querySelectorAll('.popup__feature');

  if (features) {
    featureElements.forEach((element) => {
      if (!features.some((feature) => element.classList.contains(`popup__feature--${feature}`))) {
        element.remove();
      }
    });
  } else {
    featureElements[0].parentElement.remove();
  }

  // Добавление списка изображений по шаблону
  const photoTemplate = cardElement.querySelector('.popup__photo').cloneNode(true);
  const photosElement = cardElement.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  if (photos) {
    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosElement.append(photoElement);
    });
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  return cardElement;
};

export { createCard };
