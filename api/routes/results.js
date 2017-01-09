const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  const jobId = Number(req.query.jobId);
  let promise;
  if (jobId) {
    promise = Result.find({ jobId, deep: true });
  } else {
    promise = Result.findAll();
  }
  return promise
  .then((results) => {
    res.json(results);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const resultId = Number(req.params.id);
  Result.find({ resultId, deep: false })
  .then((result) => {
    if (!result) { return; }
    return result.delete()
  })
  .then(() => {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  try {
    const result = new Result(req.body);
    result.save()
    .then(() => {
      res.status(201).end();
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
