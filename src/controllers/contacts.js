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