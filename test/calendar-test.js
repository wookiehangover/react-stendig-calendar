var assert = require('chai').assert;
var Calendar = require('../index.js');
var React = require('react/addons');
var util = React.addons.TestUtils;

describe('Calendar Component', function() {
  describe('sanity', function() {
    it('should render without error', function() {
      var cal = util.renderIntoDocument(Calendar());
      assert.ok(util.isCompositeComponent(cal));
    });
  });
});
