/** @jsx React.DOM */
'use strict';

var React = require('react');

var AutoScrollContainer = React.createClass({
	componentWillUpdate: function() {
		var node = this.getDOMNode();
		this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight;
	},
	 
	componentDidUpdate: function() {
		if (this.shouldScrollBottom) {
			var node = this.getDOMNode();
			node.scrollTop = node.scrollHeight
		}
	},

	render: function() {
		var className = this.props.success ? "" : "bg-danger";

		return (
			<pre style={{height: this.props.height, resize: "vertical"}} className={className}>
				{this.props.children}
			</pre>
		);
	}
});

module.exports=AutoScrollContainer;