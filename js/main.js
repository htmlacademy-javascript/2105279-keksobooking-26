
/**
  *Положительное целое число из диапазона [min; max],
  *либо дробное, если указан digits "кол-во знаков после запятой",
  *и undefined, если подходящих значений нет.
  */
function getRandomNumber(min, max, digits = 0) {
  min = (min < 0) ? 0 : min;
  const factor = Math.pow(10, digits);
  min = Math.ceil(min * factor);
  max = Math.floor(max * factor);
  const difference = max - min;
  if (difference >= 0 && max >= 0) {
    return Math.floor(min + Math.random() * (difference + 1)) / factor;
  }
}

getRandomNumber(3, 8);// Возвращает целое число из диапазона [3, 8]
getRandomNumber(3.3444, 5.4333, 2);// Возвращает число из диапазона [3.35, 5.43] с шагом возможных значений 0.01
