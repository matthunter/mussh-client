/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal'),
    _ = require('underscore'),
    $ = require('jquery');

var ExecutionForm = React.createClass({
	getInitialState: function() {
	    return {
	      isSaving: false,
	    };
	},

	handleAdd: function() {
		this.setState({isSaving: true});

		var onRequestHide = this.props.onRequestHide;
		var handleResponse = this.props.handleResponse;

		var username = this.refs.username.getDOMNode().value.trim();
	    var password = this.refs.password.getDOMNode().value.trim();
	    var commandId = this.refs.commandId.getDOMNode().value.trim();
		var groupId = this.refs.groupId.getDOMNode().value.trim();

		var socket = new WebSocket('ws://localhost:7979/executions');
		socket.onopen = function () {
			socket.send(JSON.stringify({
				"username": username, 
				"password": password, 
				"commandId": commandId, 
				"groupId": groupId
			}));
			onRequestHide();
		}

		socket.onerror = function (error) {
			console.log("Socket error: " + error)
		}

		socket.onmessage = function (sshResult) {
			handleResponse(sshResult);
		}

		socket.onclose = this.props.handleExecutionDone;
	},

	render: function () {
		var groups = _.map(this.props.groups, function (group) {
			return <option value={group.id} key={group.id}>{group.name}</option>
		}, this);
		var commands = _.map(this.props.commands, function (command) {
			return <option value={command.id} key={command.id}>{command.name}</option>
		}, this);

		var isSaving = this.state.isSaving;
	    return (
	    	<Modal title="Add Execution" animation={false} onRequestHide={this.props.onRequestHide}>
				<div className="modal-body">
					<form ref="form" role="form">
						<div className="form-group">
							<label>Username</label>
							<input type="text" className="form-control" ref="username"/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" ref="password"/>
						</div>
						<div className="form-group">
							<label>Group</label>
							<select className="form-control" ref="groupId">
								<option value="" disabled>Select Group</option>
								{groups}
							</select>
						</div>
						<div className="form-group">
							<label>Command</label>
							<select className="form-control" ref="commandId">
								<option value="" disabled>Select Command</option>
								{commands}
							</select>
						</div>
						<div className="form-group">
							<label>Delay</label>
							<input type="text" disabled className="form-control" ref="delay" placeholder="Number of minutes to delay execution"/>
						</div>
						<div className="form-group">
							<input type="checkbox" disabled name="email" value="email"> Send email warning</input>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<Button onClick={this.props.onRequestHide}>Close</Button>
					<Button bsStyle="primary" disabled={isSaving} onClick={this.handleAdd}>
						{isSaving ? 'Running...' : 'Run'}
					</Button>
				</div>
		    </Modal>
	   	);
	}
});

module.exports=ExecutionForm;