/** @jsx React.DOM */
'use strict';

var React = require('react'),
    CommandForm = require('./CommandForm'),
    Command = require('./Command'),
    Button = require('react-bootstrap/Button'),
    ButtonBar = require('../components/ButtonBar'),
    HeaderBar = require('../components/HeaderBar'),
    Panel = require('react-bootstrap/Panel'),
    Config = require('../config'),
    _ = require('underscore'),
    $ = require('jquery');

var ComamndPage = React.createClass({
    loadCommands: function() {
        $.get(Config.root + '/commands',
          function(commands) {
              this.setState({commands: _.sortBy(commands, function(command) {
                  return command.name.toLowerCase();
              })});
          }.bind(this));
    },

    deleteCommand: function(commandId) {
        $.ajax({
             url: Config.root + '/commands/' + commandId,
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
          return <Command key={command.id} deleteCommand={this.deleteCommand} command={command}/>
      }, this);

      var commandModal;
      if (this.state.addCommandModal) {
          commandModal = <CommandForm groups={this.state.groups} onRequestHide={this.handleModalHide}/>;
      }

  		return (
  			<div>
  				{commandModal}
          <ButtonBar>
              <Button bsStyle="primary" key="command" onClick={this.handleAddCommand}>Add Command</Button>
          </ButtonBar>
          {commands}
  			</div>	
  		);
  	}
});

module.exports=ComamndPage;