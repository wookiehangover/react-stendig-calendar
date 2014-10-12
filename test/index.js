// Phantomjs isn't es5 :(
require('es5-shim');
require('./calendar-test');
if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  window.mocha.run();
}
