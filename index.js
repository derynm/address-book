window.addEventListener('load', function () {
  if (getContactFromStorage()) {
    renderContactCard();
  }
  renderForm('create');
});
