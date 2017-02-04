const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  const jobId = Number(req.query.jobId);
  return Result.find({ jobId })
  .then((results) => {
    res.json(results.map((result) => result.toJSON()));
  })
  .catch(next);
});

module.exports = router;
