const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('../db/contacts.json');

class ContactsRepository {
  listContacts() {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }

      const contacts = JSON.parse(data);
      console.log('Lists contacts:');
      console.table(contacts);
    });
  }

  getContactById({ contactId }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      const contact = contacts.find(contact => {
        if (contact.id === contactId) {
          console.log(`Get contact by ID ${contactId}:`);
          console.table(contact);
          return contact;
        }
      });
      if (!contact) {
        console.log(`Contact with such ID ${contactId} does not exist`);
      }
    });
  }

  removeContact({ contactId }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(contact => contact.id !== contactId);

      if (newContacts.length === contacts.length) {
        console.log(`This ${contactId} not found`);
        return;
      }
      console.log(
        `Removal was successful !!! Removed contact with ID ${contactId}`,
      );
      console.table(newContacts);
      fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
        if (error) {
          return console.log(error);
        }
      });
    });
  }
  addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      contacts.push({
        id: uuid(),
        name,
        email,
        phone,
      });

      console.log('Contact added successfully !!! New contact list:');
      console.table(contacts);
      fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
        if (error) {
          return console.log(error);
        }
      });
    });
  }
  updateContact(contactId, name, email, phone) {
    const contact = contacts.find(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        console.log(`Contact with ID ${contactId} updated!`);
        console.table(contacts);
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
