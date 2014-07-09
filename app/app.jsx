/** @jsx React.DOM */
'use strict';

var React = require('react'),
	Router = require('director').Router,
	Header = require('./header'),
	ServerPage = require('./server/ServerPage'),
	ComamndPage = require('./command/CommandPage'),
	ExecutionPage = require('./execution/ExecutionPage');

var App = React.createClass({
	getInitialState: function() {
        return {page: <ServerPage/>};
    },

	componentDidMount: function () {
		var setState = this.setState;
		var router = Router({
			'/server': setState.bind(this, {page: "server", content: <ServerPage/>}),
			'/command': setState.bind(this, {page: "command", content: <ComamndPage/>}),
			'/execution': setState.bind(this, {page: "execution", content: <ExecutionPage/>})
		});
		router.init('/server');
	},	

	render: function() {
		return (
			<div>
				<Header activePage={this.state.page}/>
				<div className="container">
					{this.state.content}
				</div>
			</div>
		);	
  	}
});

React.renderComponent(<App/>, document.body);