const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then(onSuccess);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/code-and-magick',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
