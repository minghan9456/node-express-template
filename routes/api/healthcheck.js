const express = require('express');

const healtcheckCtrl = require(`${global.__base}/controllers/api/healthcheck`);
const router = express.Router();

/*
  Health check
*/

router.get('', healtcheckCtrl.index);
router.get('/', healtcheckCtrl.index);

module.exports = router;

