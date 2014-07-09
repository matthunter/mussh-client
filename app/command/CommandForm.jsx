/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal'),
    $ = require('jquery');

var CommandForm = React.createClass({
  	getInitialState: function() {
        return {
          isSaving: false,
        };
    },

    handleAdd: function() {
        this.setState({isSaving: true});

        var name = this.refs.name.getDOMNode().value.trim();
        var note = this.refs.note.getDOMNode().value.trim();
        var script = this.refs.script.getDOMNode().value.trim();

        $.post('http://localhost:7979/commands', 
            {"name": name, "note": note, "script": script},
            function(data) {
                this.props.onRequestHide();
            }.bind(this)
        );
    },

    render: function () {
      var isSaving = this.state.isSaving;
        return (
          <Modal title="Add Command" animation={false} onRequestHide={this.props.onRequestHide}>
          <div className="modal-body">
            <form ref="form" role="form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" ref="name"/>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input type="text" className="form-control" ref="note"/>
              </div>
              <div className="form-group">
                <label>Script</label>
                <input type="text" className="form-control" ref="script"/>
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

module.exports=CommandForm;