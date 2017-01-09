var express = require('express');
var router = express.Router();
var Usecase = require('../models/usecase');

router.get('/', (req, res, next) => {
  Usecase.findAll()
  .then((usecases) => {
    res.json(usecases.map((usecase) => usecase.toJSON()));
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Usecase.find(id)
  .then((usecase) => {
    res.json(usecase.toJSON());
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  usecase = new Usecase(req.body);
  usecase.id = Number(req.params.id);
  usecase.save()
  .then((result) => {
    res.json(usecase.toJSON());
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  usecase = new Usecase(req.body);
  usecase.save()
  .then((createdUsecase) => {
    res.status(201).json(createdUsecase);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Usecase.find(id)
  .then((usecase) => {
    return usecase.delete();
  })
  .then((result) => {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
