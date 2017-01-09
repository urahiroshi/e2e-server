const express = require('express');
const router = express.Router();
const Usecase = require('../models/usecase');

router.get('/', (req, res, next) => {
  Usecase.findAll()
  .then((result) => {
    res.json(result.map((usecase) => usecase.toJSON()));
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Usecase.find(id)
  .then((result) => {
    res.json(result.toJSON());
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  try {
    usecase = new Usecase(req.body);
    usecase.save()
    .then((result) => {
      res.status(201).json(usecase.toJSON());
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    usecase = new Usecase(req.body);
    usecase.id = Number(req.params.id);
    usecase.save()
    .then((result) => {
      res.json(req.body);
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
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
