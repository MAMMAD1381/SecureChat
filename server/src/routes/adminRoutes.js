const express = require('express');
const router = express.Router();

const getAdminRequests = require('../controllers/admin/getAdminRequests')
const approveAdminRequest = require('../controllers/admin/approveAdminRequest')
const denyAdminRequest = require('../controllers/admin/denyAdminRequest')



// middlewares
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const checkFields = require('../middlewares/checkFields');
const deleteUser = require('../controllers/user/deleteUser');

router.get('/adminRequests', authenticate('Bearer'), authorize(['super']), getAdminRequests);
router.post('/adminRequest/approve', authenticate('Bearer'), checkFields(['username']), authorize(['super']), approveAdminRequest);
router.post('/adminRequest/deny', authenticate('Bearer'), checkFields(['username']), authorize(['super']), denyAdminRequest);

module.exports = router;
