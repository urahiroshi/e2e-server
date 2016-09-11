var express = require('express');
var router = express.Router();
var Usecase = require('../models/usecase');

router.get('/', (req, res, next) => {
  Usecase.findAll()
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Usecase.find(id)
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

module.exports = router;
