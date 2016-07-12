const express = require('express');
const router = express.Router();
const Trial = require('../models/trial');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Trial.find(id)
  .then((trial) => {
    res.json(trial);
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
