const express = require('express');
const router = express.Router();
const controllerContacts = require('../controllers/contacts.controllers');
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../validation/contacts');
const guard = require('../helpers/guard');

router
  .get('/', guard, controllerContacts.listContacts)
  .get('/:contactId', guard, controllerContacts.getContactById)
  .post('/', guard, validateCreateContact, controllerContacts.addContact)
  .delete('/:contactId', guard, controllerContacts.removeContact)
  .put(
    '/:contactId',
    guard,
    validateUpdateContact,
    controllerContacts.updateContact,
  );

module.exports = router;
