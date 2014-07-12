/** @jsx React.DOM */
'use strict';

var React = require('react'),
    $ = require('jquery'),
    _ = require('underscore');

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
		return (
			<pre style={{resize: "vertical"}} className={this.props.success ? "" : "bg-danger"}>{this.props.children}</pre>
		);
	}
});

module.exports=AutoScrollContainer;