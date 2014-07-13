/** @jsx React.DOM */
'use strict';

var React = require('react'),
    HeaderBar = require('../components/HeaderBar'),
    Panel = require('react-bootstrap/Panel'),
    _ = require('underscore');

var ToggleBar = React.createClass({
	getInitialState: function() {
		var isOpen = _.isBoolean(this.props.initialIsOpen) ? this.props.initialIsOpen : true;
        return {isOpen: isOpen};
    },

    togglePanel: function(e) {
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen})
    },

	render: function () {
		var headerBar = <HeaderBar title={this.props.title} actions={this.props.actions} toggle={this.togglePanel}/>;

		return (
			<Panel bsStyle={this.props.bsStyle} header={headerBar} isOpen={this.state.isOpen} isCollapsable={true}>
				{this.props.children}
			</Panel>
		);
	}
});

module.exports = ToggleBar;