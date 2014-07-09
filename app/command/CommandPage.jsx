/** @jsx React.DOM */
'use strict';

var React = require('react'),
    PageHeader = require('react-bootstrap/PageHeader'),
    CommandForm = require('./CommandForm'),
    Button = require('react-bootstrap/Button'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    Well = require('react-bootstrap/Well'),
    HeaderBar = require('../components/HeaderBar'),
    Panel = require('react-bootstrap/Panel'),
    _ = require('underscore'),
    $ = require('jquery');

var ComamndPage = React.createClass({
    loadCommands: function() {
        $.get('http://localhost:7979/commands',
          function(commands) {
              this.setState({commands: _.sortBy(commands, function(command) {
                  return command.name.toLowerCase();
              })});
          }.bind(this));
    },

    deleteCommand: function(commandId) {
        $.ajax({
             url: 'http://localhost:7979/commands/' + commandId,
             type: 'DELETE'
        }).done(function() {
          this.loadCommands();
        }.bind(this));
    },  

    componentWillMount: function() {
        this.loadCommands();
    },

    getInitialState: function() {
        return {commands: [], addCommandModal: false};
    },

    handleAddCommand: function() {
        this.setState({addCommandModal: true});
    },

    handleModalHide: function() {
        this.setState({addCommandModal: false});
        this.loadCommands();
    },

  	render: function() {
      var commands = _.map(this.state.commands, function(command) {
          return <Command deleteCommand={this.deleteCommand} command={command}/>
      }.bind(this));

  		return (
  			<div>
  				{this.state.addCommandModal ? <CommandForm groups={this.state.groups} onRequestHide={this.handleModalHide}/> : <span/>}
  				<PageHeader>Commands</PageHeader>
          <Well>
              <ButtonToolbar>
                  <Button bsStyle="primary" key="command" onClick={this.handleAddCommand}>Add Command</Button>
              </ButtonToolbar>
          </Well>
          {commands}
  			</div>	
  		);
  	}
});

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

module.exports=ComamndPage;