const express = require('express');
const router = express.Router();
const Result = require('../models/result');

router.get('/', (req, res, next) => {
  Result.findAll()
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Result.find(id)
  .then((result) => {
    return result.delete();
  })
  .then((r) => {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
