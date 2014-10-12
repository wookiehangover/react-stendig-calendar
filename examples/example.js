var React = require('react');
var Calendar = require('../index.js');

React.renderComponent(
  Calendar({
    startDate: Date.now()
  }),
  document.getElementById('main')
);
