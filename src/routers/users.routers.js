const express = require('express');
const router = express.Router();
const guard = require('../helpers/guard');
const controllerUsers = require('../controllers/users.controllers');
const upload = require('../helpers/multer');

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars,
);

module.exports = router;
