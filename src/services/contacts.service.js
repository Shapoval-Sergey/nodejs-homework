const ContactsRepository = require('../repository/contacts.repo');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async listContacts(query) {
    const data = await this.repositories.contacts.listContacts(query);

    return data;
  }

  async getContactById({ contactId }) {
    const data = await this.repositories.contacts.getContactById(contactId);

    return data;
  }

  async removeContact({ contactId }) {
    const data = await this.repositories.contacts.removeContact(contactId);

    return data;
  }
  async addContact(body, userId) {
    const data = await this.repositories.contacts.addContact(body, userId);

    return data;
  }
  async updateContact({ contactId }, body) {
    const data = await this.repositories.contacts.updateContact(
      contactId,
      body,
    );
    return data;
  }
}

module.exports = ContactsService;
