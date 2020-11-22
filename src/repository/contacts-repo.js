const { ObjectID } = require('mongodb');
const { HttpCode } = require('../helpers/constants');
const { ErrorHandler } = require('../helpers/errorHandler');

class ContactsRepository {
  constructor(client) {
    this.collection = client.db().collection('contacts');
  }

  #getMongoId(contactId) {
    try {
      return ObjectID(contactId);
    } catch (e) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `MongoDB _id ${e.message}`,
        'Bad Request',
      );
    }
  }

  async listContacts() {
    const results = await this.collection.find({}).toArray();
    return results;
  }

  async getContactById(contactId) {
    const objId = this.#getMongoId(contactId);
    const [result] = await this.collection.find({ _id: objId }).toArray();
    return result;
  }

  async removeContact(contactId) {
    const objId = this.#getMongoId(contactId);
    const { value: result } = await this.collection.findOneAndDelete({
      _id: objId,
    });
    return result;
  }

  async addContact(body) {
    const {
      ops: [result],
    } = await this.collection.insertOne(body);
    return result;
  }

  async updateContact(contactId, body) {
    const objId = this.#getMongoId(contactId);
    const { value: result } = await this.collection.findOneAndUpdate(
      {
        _id: objId,
      },
      { $set: body },
      { returnOriginal: false },
    );
    return result;
  }
}

module.exports = ContactsRepository;
