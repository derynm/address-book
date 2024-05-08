function renderForm(action, currentContact) {
  const container = document.getElementById('form-container');
  const form = document.createElement('form');
  form.id = action === 'create' ? 'add-contact-form' : 'edit-contact-form';
  form.onsubmit = action === 'create' ? saveContact : editContact;
  form.innerHTML = `
    <div class="flex flex-col">
    <label for="name" class="font-semibold">Name</label>
    <input
      type="text"
      class="p-2 rounded-md border border-slate-300"
      id="name"
      name="name"
      value="${currentContact?.name || ''}"
      required
    />
  </div>
  <div class="flex flex-col">
    <label for="phone" class="font-semibold">Phone</label>
    <input
      type="tel"
      class="p-2 rounded-md border border-slate-300"
      id="phone"
      name="phone"
      value="${currentContact?.phone || ''}"
      required
    />
  </div>
  <div class="flex flex-col">
    <label for="email" class="font-semibold">Email</label>
    <input
      type="email"
      class="p-2 rounded-md border border-slate-300"
      id="email"
      name="email"
      value="${currentContact?.email || ''}"
      required
    />
  </div>
  <div class="flex flex-col">
    <label for="address" class="font-semibold">Address</label>
    <input
      type="text"
      class="p-2 rounded-md border border-slate-300"
      id="address"
      name="address"
      value="${currentContact?.address || ''}"
      required
    ></input>
  </div>
  <button
    type="submit"
    class="bg-slate-500 p-2 rounded-md text-white hover:bg-slate-600 w-full my-4"
  >
    ${action === 'create' ? 'Add Contact' : 'Edit Contact'}
  </button>
    `;
  container.appendChild(form);
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
        <h3 class="text-xl font-semibold" onclick="toContactDetail(${contact.id})">${contact.name}</h3>
        <div class="flex justify-between">
            <p>${contact.phone}</p>
            <button id="delete-contact" onclick="deleteContact(${contact.id})" class="font-semibold text-red-500">delete</button>
        </div>
      </div>
      `;
    contactCard.appendChild(card);
  });
}

function renderContactById () {
    const contact = getContactByIdFromStorage()
    const container = document.getElementById('contact-detail-container');
    container.innerHTML = `
        <div class="bg-white shadow-md border slate-300 rounded-md p-4" id="contact-detail">
        <h3 class="text-xl font-semibold">${contact.name}</h3>
        <p>${contact.phone}</p>
        <p>${contact.email}</p>
        <p>${contact.address}</p>
        <div class="flex justify-end gap-4">
            <button id="edit-contact" onclick="handleShowFormEdit()" class="font-semibold text-blue-500 border-2 border-blue-500 px-2 rounded-lg">edit</button>
            <button id="delete-contact" onclick="deleteContact(${contact.id})" class="font-semibold text-red-500 border-2 border-red-500 px-2 rounded-lg">delete</button>
        </div>
        </div>
    `;
}