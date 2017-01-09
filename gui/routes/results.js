const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  const jobId = Number(req.query.jobId);
  Result.find({ jobId })
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

module.exports = router;
