const ContactsRepository = require('../repository/contacts-repo');

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
  getContactById(contactId) {
    const data = this.repositories.contacts.getContactById(contactId);
    return data;
  }

  removeContact(contactId) {
    const data = this.repositories.contacts.removeContact(contactId);
    return data;
  }
  addContact(name, email, phone) {
    const data = this.repositories.contacts.addContact(name, email, phone);
    console.log(data);
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
