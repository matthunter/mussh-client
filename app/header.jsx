/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
	Navbar = require('react-bootstrap/Navbar'),
	Nav = require('react-bootstrap/Nav'),
	DropdownButton = require('react-bootstrap/DropdownButton'),
	MenuItem = require('react-bootstrap/MenuItem'),
	NavItem = require('react-bootstrap/NavItem');

var Header = React.createClass({
	render: function() {
		return (
		<Navbar brand="Multi-SSH">
	      <Nav>
	        <NavItem href="#/server" key="server" active={this.props.activePage == "server"}>Servers</NavItem>
	        <NavItem href="#/command" key="command" active={this.props.activePage == "command"}>Commands</NavItem>
	        <NavItem href="#/execution" key="execution" active={this.props.activePage == "execution"}>Executions</NavItem>
	      </Nav>
	    </Navbar>
	    )
	}
});

module.exports = Header;