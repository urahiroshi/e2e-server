const express = require('express');
const router = express.Router();
const Usecase = require('../models/usecase');

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

router.post('/', (req, res, next) => {
  usecase = new Usecase(req.body);
  usecase.save()
  .then((result) => {
    res.status(201).end();
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
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
