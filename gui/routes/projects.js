const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Iteration = require('../models/iteration');
const Usecase = require('../models/usecase');

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Project.find(id)
  .then(project => res.json(project))
  .catch(next);
});

router.get('/:id/iterations', (req, res, next) => {
  const offset = (req.query.offset == undefined) ? 0 : Number(req.query.offset);
  const limit = (req.query.limit == undefined) ? 10 : Number(req.query.limit);
  const projectId = Number(req.params.id);
  Iteration.findAll({ projectId, offset, limit })
  .then(iterations => res.json(iterations))
  .catch(next);
});

router.get('/:id/iterations/:iterationNumber', (req, res, next) => {
  const projectId = Number(req.params.id);
  const iterationNumber = Number(req.params.iterationNumber);
  Iteration.find(projectId, iterationNumber)
  .then(iteration => res.json(iteration))
  .catch(next);
});

router.get('/:id/usecases/*', (req, res, next) => {
  let lastIterationNumber = null;
  let offset = null;
  if (req.query.lastIterationNumber) {
    lastIterationNumber = Number(req.query.lastIterationNumber);
  } else {
    offset = (req.query.offset == undefined) ? 0 : Number(req.query.offset);
  }
  const limit = (req.query.limit == undefined) ? 10 : Number(req.query.limit);
  const usecasePath = req.params[0];
  const projectId = Number(req.params.id);
  Usecase.find({ projectId, usecasePath, offset, lastIterationNumber, limit })
  .then(usecase => res.json(usecase))
  .catch(next);
});

module.exports = router;
