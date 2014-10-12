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

var Calendar = React.createClass({

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

    return (
      <td className={classList}>{day}</td>
    );
  },

  renderRow: function(rowIndex, first, daysInMonth, today) {
    var row = [];
    _.times(7, function(cellIndex) {
      var cell;
      var day = (rowIndex * 7) + (cellIndex + 1) - first;

      if (day < 1 || day > daysInMonth) {
        cell = (<td></td>);
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

    for(var i=0;i < 5;i++) {
      var tmpRow = this.renderRow(i, first, daysInMonth, today);
      rows.push(
        <tr>{tmpRow}</tr>
      );
    }
    return rows;
  },

  render: function() {
    var start = moment(this.props.startDate);
    return (
      <div className="stendig">
        <h2 className="year">{start.format('YYYY')}</h2>
        <h2 className="month">{start.format('MMMM')}</h2>
        <table>
          <thead>
            <tr>
              <td>M</td>
              <td>T</td>
              <td>W</td>
              <td>T</td>
              <td>F</td>
              <td>S</td>
              <td>S</td>
            </tr>
          </thead>
          <tbody>
            {this.renderDates(start)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Calendar;

