var express = require('express');
var router = express.Router();
var Usecase = require('../models/usecase');

router.get('/', function(req, res, next) {
  Usecase.findAll()
  .then((usecases) => {
    res.render('usecases', {
      title: 'Usecases',
      usecases: usecases,
    });
  })
  .catch(next);
});

module.exports = router;
