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
});

function searchContact(key) {
  return getContactFromStorage().filter((contact) =>
    contact.name.toLowerCase().includes(key.toLowerCase())
  );
}

const contactForm = document.getElementById('add-contact-form');

contactForm.addEventListener('submit', saveContact);

function saveContact(e) {
  e.preventDefault();
  const currentContact = getContactFromStorage();
  const contactFormData = new FormData(contactForm);
  const newContact = Object.fromEntries(contactFormData);
  const contact = currentContact
    ? [...currentContact, newContact]
    : [newContact];

  saveContactToStorage(contact);
  renderContactCard();
  contactForm.reset();
}

function renderContactCard() {
  const searchKey = new URLSearchParams(window.location.search).get('search');
  const contact = searchKey
    ? searchContact(searchKey)
    : getContactFromStorage();

  const contactCard = document.getElementById('contact-container');
  contactCard.innerHTML = '';
  contact.forEach((contact) => {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="bg-white shadow-md border slate-300 rounded-md p-4">
      <h3 class="text-xl font-semibold">${contact.name}</h3>
      <p>${contact.phone}</p>
      <p>${contact.email}</p>
      <p>${contact.address}</p>
    </div>
    `;
    contactCard.appendChild(card);
  });
}
