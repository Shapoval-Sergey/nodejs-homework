const express = require('express');
const router = express.Router();
const controllerContacts = require('../../controllers/contacts');

router
  .get('/', controllerContacts.listContacts)
  .get('/:contactId', controllerContacts.getContactById)
  .post('/', controllerContacts.addContact)
  .delete('/:contactId', controllerContacts.removeContact)
  .patch('/:contactId', controllerContacts.updateContact);

module.exports = router;
