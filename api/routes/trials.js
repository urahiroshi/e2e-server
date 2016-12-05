const express = require('express');
const router = express.Router();
const Trial = require('../models/trial');
const Result = require('../models/result');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Trial.find(id)
  .then((trial) => {
    res.json(trial);
  })
  .catch(next);
});

router.get('/:id/result', (req, res, next) => {
  const id = req.params.id;
  Result.find(id)
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const length = Number(req.query.length);
  const usecaseId = req.query.usecaseId;
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
    console.log('trials', trials);
    res.json(trials);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
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
  trial = new Trial(req.body);
  trial.save()
  .then((result) => {
    res.status(201).json({id: result.id});
  })
  .catch(next);
});

module.exports = router;
