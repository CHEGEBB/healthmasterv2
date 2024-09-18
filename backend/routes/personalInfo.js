const express = require('express');
const router = express.Router();
const personalInfoController = require('../controllers/personalController');

router.post('/', personalInfoController.create);
router.get('/user', personalInfoController.getUser);

module.exports = router;