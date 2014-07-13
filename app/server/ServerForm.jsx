/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal'),
    Config = require('../config'),
    _ = require('underscore'),
    $ = require('jquery');

var ServerForm = React.createClass({
	getInitialState: function() {
	    return {
	      isSaving: false,
	    };
	},

	handleAdd: function() {
		this.setState({isSaving: true});

		var name = this.refs.name.getDOMNode().value.trim();
	    var addr = this.refs.addr.getDOMNode().value.trim();
	    var port = this.refs.port.getDOMNode().value.trim();
	    var tunnel = this.refs.tunnel.getDOMNode().value.trim();
	    var basedir = this.refs.basedir.getDOMNode().value.trim();
		var groupId = this.refs.groupId.getDOMNode().value.trim();

	    $.post(Config.root + '/servers', 
			{"name": name, "addr": addr, "port": port, "tunnel": tunnel, "basedir": basedir, "groupIds": groupId},
			function(data) {
				this.props.onRequestHide();
			}.bind(this)
	    );
	},

	render: function () {
		var groups = _.map(this.props.groups, function (group, index) {
			return <option value={group.id} key={group.id}>{group.name}</option>
		}, this);

		var isSaving = this.state.isSaving;
	    return (
	    	<Modal title="Add Server" animation={false} onRequestHide={this.props.onRequestHide}>
				<div className="modal-body">
					<form ref="form" role="form">
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control" ref="name"/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input type="text" className="form-control" ref="addr" placeholder="#.#.#.#"/>
						</div>
						<div className="form-group">
							<label>Port</label>
							<input type="text" className="form-control" ref="port"/>
						</div>
						<div className="form-group">
							<label>Tunnel Address</label>
							<input type="text" className="form-control" ref="tunnel" placeholder="#.#.#.#"/>
						</div>
						<div className="form-group">
							<label>Base Directory</label>
							<input type="text" className="form-control" ref="basedir" placeholder="/usr/sps/staging-second/ui-1/"/>
						</div>
						<div className="form-group">
							<label>Group</label>
							<select className="form-control" ref="groupId">
								<option value="" disabled>Select Group</option>
								{groups}
							</select>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<Button onClick={this.props.onRequestHide}>Close</Button>
					<Button bsStyle="primary" disabled={isSaving} onClick={this.handleAdd}>
						{isSaving ? 'Adding...' : 'Add'}
					</Button>
				</div>
		    </Modal>
	   	);
	}
});

module.exports=ServerForm;