function getContactFromStorage() {
  const storage = localStorage.getItem('contact');
  return JSON.parse(storage) || saveContactToStorage([]);
}

function getContactByIdFromStorage() {
  const idContact = new URLSearchParams(window.location.search).get('id');
  return getContactFromStorage().find((contact) => contact.id == idContact);
}

function saveContactToStorage(contact) {
  localStorage.setItem('contact', JSON.stringify(contact));
}
