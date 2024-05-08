function getContactFromStorage() {
  return JSON.parse(localStorage.getItem('contact'))
}

function saveContactToStorage(contact) {
  localStorage.setItem('contact', JSON.stringify(contact))
}

window.addEventListener('load', function () {
  if (getContactFromStorage()) {
    renderContactCard()
  }
})

const contactForm = document.getElementById('add-contact-form')

contactForm.addEventListener('submit', saveContact)

function saveContact(e) {
  e.preventDefault()
  const currentContact = getContactFromStorage()
  const contactFormData = new FormData(contactForm) 
  const newContact = Object.fromEntries(contactFormData)
  const contact = currentContact
    ? [...currentContact, newContact]
    : [newContact]

  saveContactToStorage(contact)
  renderContactCard()
  contactForm.reset()
}

const searchContactForm = document.getElementById('search-form')

searchContactForm.addEventListener('submit', searchContact)

function searchContact(e) {
  e.preventDefault()
  const searchValue = document.getElementById('search-value').value
  renderContactCard(
    getContactFromStorage().filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  )
}

function renderContactCard(data) {
  const contact = data ?? getContactFromStorage()
  const contactCard = document.getElementById('contact-container')
  contactCard.innerHTML = ''
  contact.forEach((contact) => {
    const card = document.createElement('div')
    card.innerHTML = `
    <div class="bg-white shadow-md border slate-300 rounded-md p-4">
      <h3 class="text-xl font-semibold">${contact.name}</h3>
      <p>${contact.phone}</p>
      <p>${contact.email}</p>
      <p>${contact.address}</p>
    </div>
    `
    contactCard.appendChild(card)
  })
}
