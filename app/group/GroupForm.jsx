/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal'),
    Config = require('../config'),
    $ = require('jquery');

var GroupForm = React.createClass({
	getInitialState: function() {
	    return {
	      isSaving: false,
	    };
	},

	handleAdd: function() {
		this.setState({isSaving: true});

		var name = this.refs.name.getDOMNode().value.trim();

	    $.post(Config.root + '/groups', 
			{"name": name},
			function(data) {
				this.props.onRequestHide();
			}.bind(this)
	    );
	},

	render: function () {
		var isSaving = this.state.isSaving;
	    return (
	    	<Modal title="Add Group" animation={false} onRequestHide={this.props.onRequestHide}>
				<div className="modal-body">
					<form ref="form" role="form">
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control" ref="name"/>
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

module.exports=GroupForm;