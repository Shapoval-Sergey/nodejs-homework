const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
let contacts;
let contact;
let newContacts;

class ContactsRepository {
  listContacts() {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }

      contacts = JSON.parse(data);
      return contacts;
    });
    return contacts;
  }

  getContactById({ contactId }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);

      contact = contacts.find(contact => {
        if (contact.id === contactId) {
          return contact;
        }
        return contact;
      });
      if (!contact) {
        console.log(`Contact with such ID ${contactId} does not exist`);
      }

      return contact;
    });
    return contact;
  }

  removeContact({ contactId }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }

      const contacts = JSON.parse(data);
      newContacts = contacts.filter(
        contact => contact.id !== Number(contactId),
      );

      if (newContacts.length === contacts.length) {
        console.log(`This ID:${contactId} not found`);
        return;
      }

      fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
        if (error) {
          return console.log(error);
        }
      });
      return newContacts;
    });

    return newContacts;
  }

  addContact({ name, email, phone }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);

      const id = uuid();
      contacts.push({
        id,
        name,
        email,
        phone,
      });

      fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
        if (error) {
          return console.log(error);
        }
      });
      return contacts;
    });
  }

  updateContact({ contactId, name, email, phone }) {
    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        return contact;
      }
    });

    if (!contact) {
      return;
    }

    fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) {
        return console.log(error);
      }
    });

    return contacts;
  }
}

module.exports = ContactsRepository;
