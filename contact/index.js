window.addEventListener('load', function () {
  if (getContactByIdFromStorage()) {
    renderContactById();
  }
});

function handleShowFormEdit() {
  if (document.getElementById('edit-contact-form')) {
    document.getElementById('edit-contact-form').remove();
    renderContactById();
  } else {
    renderForm('edit', getContactByIdFromStorage());
    document.getElementById('contact-detail').remove();
  }
}
