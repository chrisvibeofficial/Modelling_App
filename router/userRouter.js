const { Router } = require('express');
const upload = require('../utils/multer');
const { createUser, getUsers, getUser, deleteUser } = require('../controllers/userController');
const router = require('express').Router();

router.post('/users', upload.fields([
  {
  name: 'profileImage',
  maxCount: 1
},
{
  name: 'catalogs',
  maxCount: 5
}
]), createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);

module.exports = router