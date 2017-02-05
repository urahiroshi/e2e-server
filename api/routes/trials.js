const express = require('express');
const router = express.Router();
const Trial = require('../models/trial');
const Result = require('../models/result');

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Trial.find(id)
  .then((trial) => {
    res.json(trial.toJSON());
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const length = Number(req.query.length);
  const usecaseId = Number(req.query.usecaseId);
  const errors = [];
  if (!Number.isInteger(offset)) {
    errors.push('`offset` needs to be Integer.');
  }
  if (!Number.isInteger(length)) {
    errors.push('`length` needs to be specified by Integer (within 100).');
  } else if (length > 100) {
    errors.push('`length` needs to be within 100.');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  Trial.findAll({ offset, length, usecaseId })
  .then((trials) => {
    const jsons = trials.map((trial) => trial.toJSON());
    console.log('trials', jsons);
    res.json(jsons);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Result.find(id)
  .then((result) => {
    if (!result) { return; }
    return result.delete();
  })
  .then(() => {
    return Trial.find(id)
  })
  .then((trial) => {
    if (!trial) { return; }
    return trial.delete();
  })
  .then(() => {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  try {
    trial = new Trial(req.body);
    trial.save()
    .then(() => {
      res.status(201).json(trial.toJSON());
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
