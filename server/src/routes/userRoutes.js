const express = require('express');
const router = express.Router();

// const { registerUser, loginUser, getUserPublicKey } = require('../controllers/userController');
const registerUser = require('../controllers/user/register')
const loginUser = require('../controllers/user/login')
const getUserPublicKey = require('../controllers/user/publicKey')
const getUsers = require('../controllers/user/users')
const getGroups = require('../controllers/user/groups')

const requestAdmin = require('../controllers/admin/requestAdmin')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.post('/register', checkFields(['username', 'email', 'password', 'confirmPassword']), registerUser);
router.post('/login', checkFields(['username', 'password']), loginUser);
router.get('/publickey/:username', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUserPublicKey);
router.get('/', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getUsers);
router.get('/requestAdmin', authenticate('Bearer'), authorize(['user', 'admin', 'super']), requestAdmin);
router.get('/groups', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroups);

module.exports = router;
