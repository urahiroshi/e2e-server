const express = require('express');
const router = express.Router();
const Screenshot = require('../models/screenshot');

router.get('/:id', (req, res, next) => {
  return Screenshot.find({ resultId: req.params.id })
  .then((screenshot) => {
    res.json(screenshot);
  })
  .catch(next);
});

module.exports = router;
