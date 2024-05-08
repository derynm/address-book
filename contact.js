function searchContact(key) {
  return getContactFromStorage().filter((contact) =>
    contact.name.toLowerCase().includes(key.toLowerCase())
  );
}

function saveContact(e) {
  e.preventDefault();
  const contactForm = document.getElementById('add-contact-form');

  const currentContact = getContactFromStorage();
  const contactFormData = new FormData(contactForm);
  const contactId = currentContact.length
    ? currentContact[currentContact.length - 1].id + 1
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
  const idContact = new URLSearchParams(window.location.search).get('id');
  if (idContact) {
    window.location.href = '/';
  }
  renderContactCard();
}

function editContact(e) {
  e.preventDefault();
  const contactForm = document.getElementById('edit-contact-form');
  const contactFormData = new FormData(contactForm);
  const currentContact = getContactFromStorage();
  const idContact = new URLSearchParams(window.location.search).get('id');
  const contactIndex = currentContact.findIndex(
    (contact) => contact.id == idContact
  );
  const newContact = {
    id: parseInt(idContact),
    name: contactFormData.get('name'),
    phone: contactFormData.get('phone'),
    email: contactFormData.get('email'),
    address: contactFormData.get('address'),
  };
  currentContact[contactIndex] = newContact;
  saveContactToStorage(currentContact)
  handleShowFormEdit(); 
}

function toContactDetail(id) {
  window.location.href = `/contact/?id=${id}`;
}
