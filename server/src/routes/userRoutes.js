const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/user/register')
const loginUser = require('../controllers/user/login')
const getUserPublicKey = require('../controllers/user/publicKey')
const getUsers = require('../controllers/user/users')
const getProfile = require('../controllers/user/getProfile')

const requestAdmin = require('../controllers/admin/requestAdmin')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields');
const deleteUser = require('../controllers/user/deleteUser');

router.post('/register', checkFields(['username', 'email', 'password', 'confirmPassword']), registerUser);
router.post('/login', checkFields(['username', 'password']), loginUser);
router.get('/publickey/:username', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUserPublicKey);
router.get('/users', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUsers);
router.post('/requestAdmin', authenticate('Bearer'), checkFields(['username']), authorize(['user', 'admin', 'super']), requestAdmin);
router.get('/me', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getProfile);
router.delete('delete', authenticate('Bearer'), checkFields(['username']), authorize(['super']), deleteUser)

module.exports = router;
