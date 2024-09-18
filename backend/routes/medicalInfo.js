const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalController');

router.post('/save', medicalController.saveMedicalInfo);

module.exports = router;