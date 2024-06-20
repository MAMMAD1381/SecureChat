const express = require('express');
const router = express.Router();

const getAdminRequests = require('../controllers/admin/getAdminRequests')



// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields');
const deleteUser = require('../controllers/user/deleteUser');

router.get('/adminRequests', authenticate('Bearer'), authorize(['super']), getAdminRequests);

module.exports = router;
