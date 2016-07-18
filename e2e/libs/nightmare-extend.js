const Nightmare = require('nightmare');

Nightmare.action('exec', function (fn, done) {
  fn();
  this.evaluate_now(function () { return this; }, done);
});