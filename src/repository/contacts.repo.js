const Contact = require('../schemas/contacts');
const { Subscr } = require('../helpers/constants');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }
  async listContacts({ page = 1, limit = 20 }) {
    const { docs: contacts, totalDocs: total } = await this.model.paginate(
      {},
      { page, limit },
    );
    return { contacts, total, page, limit };
  }

  async getContactById(contactId) {
    const result = await this.model.findOne({ _id: contactId });
    return result;
  }

  async removeContact(contactId) {
    const result = await this.model.findByIdAndRemove({ _id: contactId });
    return result;
  }

  async addContact(body, userId) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async updateContact(contactId, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true },
    );
    return result;
  }
}

module.exports = ContactsRepository;
