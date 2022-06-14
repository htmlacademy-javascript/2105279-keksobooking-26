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

/**
  *Возвращает случайный элемент из массива
  */
const getRandomItem = (sourceList) => sourceList[getRandomInt(1, sourceList.lenght - 1)];

export { getRandomInt, getRandomFloat, getRandomItem };
