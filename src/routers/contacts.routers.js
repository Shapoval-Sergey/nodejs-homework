const express = require('express');
const router = express.Router();
const controllerContacts = require('../controllers/contacts.controllers');
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../validation/contacts');

router
  .get('/', controllerContacts.listContacts)
  .get('/:contactId', controllerContacts.getContactById)
  .post('/', validateCreateContact, controllerContacts.addContact)
  .delete('/:contactId', controllerContacts.removeContact)
  .put('/:contactId', validateUpdateContact, controllerContacts.updateContact);

module.exports = router;
