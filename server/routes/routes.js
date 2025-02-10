const express = require('express');
const router = express.Router();
const getauth = require('./auth.js');
const getTasks = require('./tasks.js');

router.use('/auth',getauth);
router.use('/tasks',getTasks);

module.exports=router;
