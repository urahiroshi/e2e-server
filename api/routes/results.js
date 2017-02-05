const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  const trialId = Number(req.query.trialId);
  return Result.find({ trialId })
  .then((results) => {
    res.json(results.map((result) => result.toJSON()));
  })
  .catch(next);
});

module.exports = router;
