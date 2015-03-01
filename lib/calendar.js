/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');
var moment = require('moment');

// Poor man's kerning adjustments
var K3  = [20,22,23,28,29,30];
var K10 = [10,12,13,14,15,16,17,18,19,31];
var K13 = [11];

var Calendar = React.createClass({displayName: 'Calendar',

  propTypes: {
    startDate: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  getDefaultProps: function() {
    return {
      startDate: +new Date()
    }
  },

  renderCell: function(day, today) {
    var classList = React.addons.classSet({
      k13: _.contains(K13, day),
      k10: _.contains(K10, day),
      k3: _.contains(K3, day),
      today: day === today
    });
    var key = 'd' + day

    return (
      React.DOM.td({className: classList, key: key}, day)
    );
  },

  renderRow: function(rowIndex, first, daysInMonth, today) {
    var row = [];
    _.times(7, function(cellIndex) {
      var cell;
      var day = (rowIndex * 7) + (cellIndex + 1) - first;

      if (day < 1 || day > daysInMonth) {
        cell = (React.DOM.td({key: _.uniqueId('row' + rowIndex)}));
      } else {
        cell = this.renderCell(day, today);
      }

      row.push(cell);
    }.bind(this));

    return row;
  },

  renderDates: function(start) {
    var rows = [];
    var self = this;
    var today = new Date().getDate();
    var daysInMonth = start.daysInMonth();
    var first = start.startOf('month').toDate().getDay();
    // Stendig starts with Monday, not Sunday. Bump the reported Day down by 1.
    if (first === 0) {
      first = 6;
    } else {
      first -= 1;
    }

    var rowCount = 5;
    if (first >= 5 && daysInMonth >= 30) {
      rowCount = 6;
    }

    for(var i=0;i < rowCount;i++) {
      var tmpRow = this.renderRow(i, first, daysInMonth, today);
      rows.push(
        React.DOM.tr({key: ('row' + i)}, tmpRow)
      );
    }
    return rows;
  },

  render: function() {
    var start = moment(this.props.startDate);
    return (
      React.DOM.div({className: "stendig"}, 
        React.DOM.h2({className: "year"}, start.format('YYYY')), 
        React.DOM.h2({className: "month"}, start.format('MMMM')), 
        React.DOM.table(null, 
          React.DOM.thead(null, 
            React.DOM.tr(null, 
              React.DOM.td({key: "day1"}, "M"), 
              React.DOM.td({key: "day2"}, "T"), 
              React.DOM.td({key: "day3"}, "W"), 
              React.DOM.td({key: "day4"}, "T"), 
              React.DOM.td({key: "day5"}, "F"), 
              React.DOM.td({key: "day6"}, "S"), 
              React.DOM.td({key: "day7"}, "S")
            )
          ), 
          React.DOM.tbody(null, 
            this.renderDates(start)
          )
        )
      )
    );
  }
});

module.exports = Calendar;

