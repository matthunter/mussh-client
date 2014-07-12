/** @jsx React.DOM */
'use strict';

var React = require('react'),
    HeaderBar = require('../components/HeaderBar'),
    Panel = require('react-bootstrap/Panel');

var Command = React.createClass({
    render: function() {
      var command = this.props.command;
      return (
          <Panel header={<HeaderBar title={command.name} handleRemove={this.props.deleteCommand.bind(
              null, command.id)}/>} key={command.id}>
              <div><p><b>Notes: </b>{command.note}</p><p><b>Command: </b>{command.script}</p></div>
          </Panel>
        )
    }
});

module.exports=Command;