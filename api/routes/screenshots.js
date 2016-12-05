const express = require('express');
const router = express.Router();
const Screenshot = require('../models/screenshot');

router.get('/', (req, res, next) => {
  return Screenshot.find(req.query)
  .then((screenshot) => {
    res.json(screenshot);
  })
  .catch(next);
});

module.exports = router;
