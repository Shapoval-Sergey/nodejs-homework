const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('../db/contacts.json');

class ContactsRepository {
  listContacts() {
    fs.readFile(contactsPath, 'utf-8', async (error, data) => {
      if (error) {
        return console.log(error);
      }

      const contacts = await JSON.parse(data);
      return contacts;
    });
  }

  getContactById({ id }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      const contact = contacts.find(contact => {
        if (contact.id === id) {
          return contact;
        }
      });
      if (!contact) {
        console.log(`Contact with such ID ${id} does not exist`);
      }
    });
  }

  removeContact({ id }) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(contact => contact.id !== id);

      if (newContacts.length === contacts.length) {
        console.log(`This ${id} not found`);
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
  addContact(body) {
    fs.readFile(contactsPath, 'utf-8', (error, data) => {
      if (error) {
        return console.log(error);
      }
      const contacts = JSON.parse(data);
      const id = uuid();
      contacts.push({
        id,
        ...body,
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
  updateContact(id, body) {
    const contact = contacts.find(contact => {
      if (contact.id === id) {
        contact = {
          ...body,
        };
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
