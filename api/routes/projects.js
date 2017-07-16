const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Iteration = require('../models/iteration');
const Trial = require('../models/trial');

router.get('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Project.find(id)
  .then((project) => {
    res.json(project.toJSON());
  })
  .catch(next);
});

router.get('/:id/iterations', (req, res, next) => {
  const offset = (req.query.offset == undefined) ? 0 : Number(req.query.offset);
  const limit = (req.query.limit == undefined) ? 10 : Number(req.query.limit);
  const errors = [];
  if (!Number.isInteger(offset)) {
    errors.push('`offset` needs to be Integer.');
  }
  if (!Number.isInteger(limit)) {
    errors.push('`limit` needs to be specified by Integer (within 100).');
  } else if (limit > 100) {
    errors.push('`limit` needs to be within 100.');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  const projectId = Number(req.params.id);
  Iteration.findAll({ projectId, offset, limit })
  .then((iterations) => {
    res.json(iterations.map((iteration) => iteration.toJSON()));
  })
  .catch(next);
});

router.get('/:id/iterations/:iterationNumber', (req, res, next) => {
  const projectId = Number(req.params.id);
  const iterationNumber = Number(req.params.iterationNumber);
  Iteration.find(projectId, iterationNumber)
  .then((iteration) => {
    res.json(iteration.toJSON());
  })
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
  const errors = [];
  if (lastIterationNumber != undefined && !Number.isInteger(lastIterationNumber)) {
    errors.push('`lastIterationNumber` needs to be Integer.');
  }
  if (offset != undefined && !Number.isInteger(offset)) {
    errors.push('`offset` needs to be Integer.');
  }
  if (!Number.isInteger(limit)) {
    errors.push('`limit` needs to be specified by Integer (within 100).');
  } else if (limit > 100) {
    errors.push('`limit` needs to be within 100.');
  }
  if (usecasePath === '') {
    errors.push('usecase path needs to be set.');
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  const projectId = Number(req.params.id);
  const usecase = { usecasePath };
  Trial.findByUsecase({ projectId, usecasePath, offset, lastIterationNumber, limit })
  .then((trials) => {
    if (trials.length === 0) {
      res.status(404).json({ errors: ['no trials'] });
      return;
    }
    usecase.trials = trials.map((trial) => trial.toJSON());
    res.json(usecase);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  try {
    const project = new Project();
    project.save()
    .then(() => {
      res.status(201).json(project.toJSON());
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/iterations', (req, res, next) => {
  try {
    const iteration = new Iteration(req.body);
    const projectId = Number(req.params.id);
    iteration.save(projectId)
    .then(() => {
      res.status(201).json(iteration.toJSON());
    })
    .catch(next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
