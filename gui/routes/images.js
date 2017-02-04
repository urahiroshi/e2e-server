const express = require('express');
const router = express.Router();
const Screenshot = require('../models/screenshot');

router.get('/screenshots/:id.png', (req, res, next) => {
  const resultId = Number(req.params.id);
  Screenshot.find({ resultId })
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
