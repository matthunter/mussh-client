/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Well = require('react-bootstrap/Well'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar');

var ButtonBar = React.createClass({
	render: function () {
		return (
			<Well>
              <ButtonToolbar>
                  {this.props.children}
              </ButtonToolbar>
			</Well>
		);
	}
});

module.exports=ButtonBar;