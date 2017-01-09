const express = require('express');
const router = express.Router();
const Screenshot = require('../models/screenshot');

router.get('/results/:resultId/screenshots/:name.png', (req, res, next) => {
  const resultId = Number(req.params.resultId);
  const name = req.params.name;
  Screenshot.find({ resultId, name })
  .then((screenshot) => {
    const rawImage = new Buffer(screenshot.image, 'base64');
    res.set({
      'Content-Type': 'image/png',
      'Content-Length': rawImage.length.toString()
    })
    res.send(rawImage);
  })
  .catch(next);
});

module.exports = router;
