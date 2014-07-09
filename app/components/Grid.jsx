/** @jsx React.DOM */
'use strict';

var ReactGrid = require('react-bootstrap/Grid'),
    Row = require('react-bootstrap/Row'),
    Col = require('react-bootstrap/Col'),
    _ = require('underscore');

var Grid = React.createClass({
  render: function() {
      var numCols = this.props.numCols;
      var rowGroups = _.groupBy(this.props.children, function (item, index) {
          return Math.floor(index/numCols); 
      });
      
      var rows = _.map(rowGroups, function (row, index) {
          return <GridRow data={row}/>;
      });

      return <ReactGrid fluid={this.props.fluid}>{rows}</ReactGrid>;
  }
});

var GridRow = React.createClass({
    render: function() {
        var columns = _.map(this.props.data, function(item, index) {
            return <Col md={4}>{item}</Col>
        });
        return <Row>{columns}</Row>
    }
});

module.exports=Grid
