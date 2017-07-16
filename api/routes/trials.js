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
    const trial = new Trial(req.body);
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
