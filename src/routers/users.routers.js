const express = require('express');
const router = express.Router();
const guard = require('../helpers/guard');
const controllerUsers = require('../controllers/users.controllers');

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);

module.exports = router;
