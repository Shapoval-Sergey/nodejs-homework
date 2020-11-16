const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  listContacts() {
    const data = this.repositories.contacts.listContacts();
    return data;
  }
  getContactById({ id }) {
    const data = this.repositories.contacts.getContactById(id);
    return data;
  }

  removeContact({ id }) {
    const data = this.repositories.contacts.removeContact(id);
    return data;
  }
  addContact(name, email, phone) {
    const data = this.repositories.contacts.addContact(name, email, phone);
    return data;
  }
  updateContact(contactId, name, email, phone) {
    const data = this.repositories.contacts.updateContact(
      contactId,
      name,
      email,
      phone,
    );
    return data;
  }
}

module.exports = ContactsService;
