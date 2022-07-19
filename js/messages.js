const createMessage = (selector, onSubmit = () => { }, onRreject = () => { }) => {
  const messageElement = document.querySelector(selector).content.firstElementChild.cloneNode(true);
  const buttonElement = messageElement.querySelector('.error__button');
  document.body.prepend(messageElement);

  const onCloseMessage = (evt) => {
    if (evt.type === 'click' || evt.key === 'Escape') {
      window.removeEventListener('click', onCloseMessage);
      window.removeEventListener('keydown', onCloseMessage);
      if (buttonElement) {
        buttonElement.removeEventListener('click', onCloseMessage);
      }
      if (evt.target === buttonElement) {
        onSubmit();
      } else {
        onRreject();
      }
      messageElement.remove();
    }
  };

  if (buttonElement) {
    buttonElement.addEventListener('click', onCloseMessage);
  }
  window.addEventListener('click', onCloseMessage);
  window.addEventListener('keydown', onCloseMessage);
};

export { createMessage };
