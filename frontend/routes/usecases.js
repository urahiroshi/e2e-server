const express = require('express');
const router = express.Router();
const model = require('/models/usecase');

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
