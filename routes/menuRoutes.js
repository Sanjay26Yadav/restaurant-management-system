const express = require('express');
const ROLES = require('../config/roles');
const router = express.Router();
const seemenu = require('../models/menuModel.json')
const verifyRoles = require('../middleware/verifyRoles');
const verifyJwt = require('../middleware/verifyJWT')


router.get('/',verifyJwt, verifyRoles(ROLES.Admin,ROLES.Customer,ROLES.Waiter), function(req, res){
    
   res.send(seemenu);	
});

module.exports = router;