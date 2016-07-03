const express = require('express');
const router = express.Router();
const Usecase = require('../models/usecase');

router.get('/', function(req, res, next) {
  try {
    res.json(Usecase.findAll());
  } catch (err) {
    next(err);
  }
});

router.post('/', function(req, res, next) {
  usecase = new Usecase(req.body);
  usecase.save();
  res.status(201).end();
});

module.exports = router;
