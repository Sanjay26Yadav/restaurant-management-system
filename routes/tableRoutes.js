const express = require('express');
const router = express.Router();
const table = require('../controllers/tableController');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES = require('../config/roles')
const verifyJwt = require('../middleware/verifyJWT')

router.post('/addtable',verifyJwt, verifyRoles(ROLES.Admin), table.addtable);
router.patch('/updatetable',verifyJwt, verifyRoles(ROLES.Admin), table.updatetable);
router.patch('/assignwaiter',verifyJwt, verifyRoles(ROLES.Admin), table.assignwaiter);
router.patch('/booktable', verifyJwt, verifyRoles(ROLES.Admin,ROLES.Customer,ROLES.Waiter), table.booktable);
router.patch('/placeorder',verifyJwt, verifyRoles(ROLES.Admin,ROLES.Waiter), table.placeorder);
router.get('/seebill',verifyJwt, verifyRoles(ROLES.Admin, ROLES.Customer), table.seebill);
router.patch('/generatebill',verifyJwt, verifyRoles(ROLES.Admin), table.generatebill);
router.delete('/deletetable',verifyJwt, verifyRoles(ROLES.Admin), table.deletetable);



module.exports = router;