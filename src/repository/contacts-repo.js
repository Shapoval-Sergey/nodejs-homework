const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
const contactList = fs.readFileSync(contactsPath, 'utf-8');
const contacts = JSON.parse(contactList);

class ContactsRepository {
  listContacts() {
    return contacts;
  }

  getContactById(contactId) {
    const foundContact = contacts.find(contact => contact.id === contactId);
    if (!foundContact) {
      return;
    }
    return foundContact;
  }

  removeContact(contactId) {
    const newContacts = contacts.filter(contact => contact.id !== contactId);

    if (newContacts.length === contacts.length) {
      return contacts;
    }

    fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
      if (error) {
        return console.log('error :', error);
      }
    });

    return newContacts;
  }

  addContact({ name, email, phone }) {
    const id = uuid();
    contacts.push({
      id,
      name: name,
      email: email,
      phone: phone,
    });

    fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) {
        return console.log(error);
      }
    });

    return contacts;
  }

  updateContact(contactId, name, email, phone) {
    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;

        return contact;
      }
    });

    if (contact === null) {
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
 