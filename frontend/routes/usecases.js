const express = require('express');
const router = express.Router();
const Usecase = require('../models/usecase');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.json(Usecase.getAll());
  next();
});

router.post('/', function(req, res, next) {
  usecase = new Usecase(req.body);
  usecase.save();
  res.status(201).end();
});

module.exports = router;
