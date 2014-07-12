/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    AutoScrollContainer = require('./AutoScrollContainer');

var SshResult = React.createClass({
	render: function() {
		var sshResult = this.props.sshResult;
		var bsStyle = sshResult.highlight ? (sshResult.success ? "success" : "danger") : "default";
		return (
			<Panel bsStyle={bsStyle} header={<b>{sshResult.server.name}</b>} isCollapsable={true}>
				<AutoScrollContainer success={sshResult.success}>{sshResult.output}</AutoScrollContainer>
			</Panel>
		);
	}
});

module.exports = SshResult;