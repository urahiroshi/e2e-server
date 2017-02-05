const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  const trialId = Number(req.query.trialId);
  Result.find({ trialId })
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

module.exports = router;
