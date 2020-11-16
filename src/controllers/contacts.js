const { HttpCode } = require('../helpers/constants');
const ContactsService = require('../services/contacts');

const contactsService = new ContactsService();

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsService.listContacts();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = (req, res, next) => {
  try {
    const contact = contactsService.getContactById(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeContact = (req, res, next) => {
  try {
    const contact = contactsService.removeContact(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = (req, res, next) => {
  try {
    const contact = contactsService.addContact(req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};
const updateContact = (req, res, next) => {
  try {
    const contact = contactsService.updateContact(req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
  updateContact,
};

// const contactsPath = path.resolve('../../db/contacts.json');

// function listContacts() {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       return console.log(error);
//     }

//     const contacts = JSON.parse(data);
//     console.log('Lists contacts:');
//     console.table(contacts);
//   });
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       return console.log(error);
//     }
//     const contacts = JSON.parse(data);
//     const contact = contacts.find(contact => {
//       if (contact.id === contactId) {
//         console.log(`Get contact by ID ${contactId}:`);
//         console.table(contact);
//         return contact;
//       }
//     });
//     if (!contact) {
//       console.log(`Contact with such ID ${contactId} does not exist`);
//     }
//   });
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       return console.log(error);
//     }
//     const contacts = JSON.parse(data);
//     const newContacts = contacts.filter(contact => contact.id !== contactId);

//     if (newContacts.length === contacts.length) {
//       console.log(`This ${contactId} not found`);
//       return;
//     }
//     console.log(
//       `Removal was successful !!! Removed contact with ID ${contactId}`,
//     );
//     console.table(newContacts);
//     fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
//       if (error) {
//         return console.log(error);
//       }
//     });
//   });
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, 'utf-8', (error, data) => {
//     if (error) {
//       return console.log(error);
//     }
//     const contacts = JSON.parse(data);
//     contacts.push({
//       name,
//       email,
//       phone,
//     });

//     console.log('Contact added successfully !!! New contact list:');
//     console.table(contacts);
//     fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
//       if (error) {
//         return console.log(error);
//       }
//     });
//   });
// }
