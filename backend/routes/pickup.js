const express = require('express');
const router = express.Router();
const { schedulePickup, getPickups } = require('../controllers/pickupController');

router.post('/schedule', schedulePickup);   // POST /api/pickups/schedule
router.get('/', getPickups);                // GET /api/pickups/

module.exports = router;
