const express = require('express');
const router = express.Router();


const getGroups = require('../controllers/group/getGroups')
const createGroups = require('../controllers/group/createGroup')

// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields')

router.get('/groups', authenticate('Bearer'), authorize(['user', 'admin', 'super']), getGroups);
router.post('/create', authenticate('Bearer'), checkFields(['groupName', 'description', 'users']), authorize(['admin', 'super']), createGroups);

module.exports = router;
