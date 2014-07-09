/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Glyphicon = require('react-bootstrap/Glyphicon');

var HeaderBar = React.createClass({
    render: function() {
        return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-6"><b>{this.props.title}</b></div>
                  <div className="col-md-6">
                    <span className="pull-right">
                        <Button bsSize="xsmall" bsStyle="link" onClick={this.props.handleRemove}><Glyphicon glyph="trash"/></Button>
                    </span>
                  </div>
              </div>
          </div>
        );
    }
});

module.exports=HeaderBar;