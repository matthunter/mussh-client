/** @jsx React.DOM */
'use strict';

var React = require('react'),
    TogglePanel = require('../components/TogglePanel'),
    AutoScrollContainer = require('./AutoScrollContainer');

var SshResult = React.createClass({
	render: function() {
		var sshResult = this.props.sshResult;
		var bsStyle = sshResult.highlight ? (sshResult.success ? "success" : "danger") : "default";
		return (
			<TogglePanel bsStyle={bsStyle} title={sshResult.server.name}>
				<AutoScrollContainer success={sshResult.success}>{sshResult.output}</AutoScrollContainer>
			</TogglePanel>
		);
	}
});

module.exports = SshResult;