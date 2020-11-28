const express = require('express');
const router = express.Router();
const controllerUsers = require('../controllers/users.controllers');

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', controllerUsers.logout);

module.exports = router;
