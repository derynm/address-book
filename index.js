function getContactFromStorage() {
  return JSON.parse(localStorage.getItem('contact'));
}

function saveContactToStorage(contact) {
  localStorage.setItem('contact', JSON.stringify(contact));
}

window.addEventListener('load', function () {
  if (getContactFromStorage()) {
    renderContactCard();
  }
  renderForm('create');
});

function searchContact(key) {
  return getContactFromStorage().filter((contact) =>
    contact.name.toLowerCase().includes(key.toLowerCase())
  );
}

function saveContact(e) {
  e.preventDefault();
  const contactForm = document.getElementById('add-contact-form');

  console.log('first');
  const currentContact = getContactFromStorage();
  const contactFormData = new FormData(contactForm);
  const contactId = currentContact
    ? currentContact[currentContact.length - 1] + 1
    : 1;
  const newContact = {
    id: contactId,
    name: contactFormData.get('name'),
    phone: contactFormData.get('phone'),
    email: contactFormData.get('email'),
    address: contactFormData.get('address'),
  };
  const contact = currentContact
    ? [...currentContact, newContact]
    : [newContact];

  saveContactToStorage(contact);
  renderContactCard();
  contactForm.reset();
}

function deleteContact(id) {
  const contact = getContactFromStorage().filter(
    (contact) => contact.id !== id
  );
  saveContactToStorage(contact);
  renderContactCard();
}
