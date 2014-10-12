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
    var key = 'd' + day

    return (
      <td className={classList} key={key}>{day}</td>
    );
  },

  renderRow: function(rowIndex, first, daysInMonth, today) {
    var row = [];
    _.times(7, function(cellIndex) {
      var cell;
      var day = (rowIndex * 7) + (cellIndex + 1) - first;

      if (day < 1 || day > daysInMonth) {
        cell = (<td key={_.uniqueId('row' + rowIndex)}></td>);
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
        <tr key={('row' + i)}>{tmpRow}</tr>
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
              <td key="day1">M</td>
              <td key="day2">T</td>
              <td key="day3">W</td>
              <td key="day4">T</td>
              <td key="day5">F</td>
              <td key="day6">S</td>
              <td key="day7">S</td>
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

