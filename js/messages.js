const successTemplateElement = document.querySelector('#success').content.firstElementChild;

const showSuccessMessage = () => {
  const messageElement = successTemplateElement.cloneNode(true);
  document.body.prepend(messageElement);
  setTimeout(() => messageElement.remove(), 5000);
};

const createErrorDialog = (selector, onSubmit) => {
  return () => {
    const messageElement = document.querySelector(selector).content.firstElementChild.cloneNode(true);
    const buttonElement = messageElement.querySelector('.error__button');
    const buttonRejectElement = messageElement.querySelector('.error__reject');
    document.body.prepend(messageElement);
    buttonElement.addEventListener('click', () => {
      messageElement.remove();
      onSubmit();
    });

    buttonRejectElement.addEventListener('click', () => {
      messageElement.remove();
    });
  };
};

export { showSuccessMessage, createErrorDialog };