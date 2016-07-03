const express = require('express');
const router = express.Router();
const Usecase = require('../models/usecase');

router.get('/', function(req, res, next) {
  Usecase.findAll()
  .then((result) => {
    res.json(result);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  usecase = new Usecase(req.body);
  usecase.save()
  .then((result) => {
    res.status(201).end();
  })
  .catch(next);
});

module.exports = router;
