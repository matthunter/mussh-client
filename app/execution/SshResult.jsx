/** @jsx React.DOM */
'use strict';

var React = require('react'),
    TogglePanel = require('../components/TogglePanel'),
    AutoScrollContainer = require('./AutoScrollContainer');

var SshResult = React.createClass({
	getInitialState: function() {
		return {height: 200, icon: "resize-full"};
	},

	toggleMaximize: function() {
		var node = this.refs.container.getDOMNode();
		if (this.state.height !== "auto") {
			this.setState({height: "auto", icon: "resize-small"});
		} else {
			this.setState({height: 200, icon: "resize-full"});
		}
	},

	render: function() {
		var sshResult = this.props.sshResult;
		var maximizeAction = {action: this.toggleMaximize, icon: this.state.icon};
		var bsStyle = sshResult.highlight ? (sshResult.success ? "success" : "danger") : "default";

		return (
			<TogglePanel bsStyle={bsStyle} title={sshResult.server.name} actions={[maximizeAction]}>
				<AutoScrollContainer ref="container" height={this.state.height} success={sshResult.success}>
					{sshResult.output}
				</AutoScrollContainer>
			</TogglePanel>
		);
	}
});

module.exports = SshResult;