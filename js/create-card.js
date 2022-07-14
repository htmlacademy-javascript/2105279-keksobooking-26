const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

// Создание элемента с данными на основе шаблона
const createCard = ({ author, offer }) => {
  const cardElement = cardAdvertTemplate.cloneNode(true);

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

  replaceTextContent('.popup__title', offer.title);
  replaceTextContent('.popup__text--address', offer.address);
  replaceTextContent('.popup__text--price span', offer.price);
  if (!offer.price) {
    replaceTextContent('.popup__text--price', offer.price);
  }
  replaceTextContent('.popup__type', OFFER_TYPE[offer.type]);
  replaceTextContent('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`, !!offer.rooms && !!offer.guests);
  replaceTextContent('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`, !!offer.checkin && !!offer.checkout);
  replaceTextContent('.popup__description', offer.description);

  // Удаление элементов списка не соответствюэших данным с списке 'особенностей'
  const featureElements = cardElement.querySelectorAll('.popup__feature');

  if (offer.features === undefined) {
    featureElements[0].parentElement.remove();
  } else {
    featureElements.forEach((element) => {
      if (!offer.features.some((feature) => element.classList.contains(`popup__feature--${feature}`))) {
        element.remove();
      }
    });
  }

  // Добавление списка изображений по шаблону
  const photoTemplate = cardElement.querySelector('.popup__photo').cloneNode(true);
  const photosElement = cardElement.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  if (offer.photos !== undefined) {
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosElement.append(photoElement);
    });
  }
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  return cardElement;
};

export { createCard };
