/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Panel = require('react-bootstrap/Panel'),
    ButtonBar = require('../components/ButtonBar'),
    ExecutionForm = require('./ExecutionForm'),
    SshResult = require('./SshResult'),
    AutoScrollContainer = require('./AutoScrollContainer'),
    $ = require('jquery'),
    _ = require('underscore');

var ExecutionPage = React.createClass({
    getInitialState: function() {
        return {groups: [], commands: [], sshResultMap: {}, addExecutionModal: false};
    },

    componentWillMount: function() {
        this.loadGroups();
        this.loadCommands();
    },

    loadGroups: function() {
        $.get('http://localhost:7979/groups',
            function(groups) {
                this.setState({groups: _.sortBy(groups, function(group) {
                  return group.name.toLowerCase();
                })});
            }.bind(this)
        );
    },

    loadCommands: function() {
        $.get('http://localhost:7979/commands',
            function(commands) {
                this.setState({commands: _.sortBy(commands, function(command) {
                  return command.name.toLowerCase();
              })});
            }.bind(this)
        );
    },

    handleAddExecution: function() {
        if (this.state.webSocket) {
          this.state.webSocket.close();
        }
        this.setState({addExecutionModal: true, sshResultMap: {}, webSocket: null});
    },

    handleExecutionDone: function() {
        this.setState({webSocket: null});
    },

    handleCancelExecution: function() {
        this.state.webSocket.close()
        this.setState({webSocket: null});
    },

    handleModalHide: function() {
        this.setState({addExecutionModal: false});
    },

    handleResponse: function(message) {
        var sshResult = JSON.parse(message.data);
        sshResult.highlight = true;

        var sshResultMap = this.state.sshResultMap;
        if (sshResultMap[sshResult.server.id]) {
            sshResult.output = sshResultMap[sshResult.server.id].output + sshResult.output;
            sshResult.update = sshResultMap[sshResult.server.id].update;
        } else {
          sshResult.update = _.debounce(function() {
              var sshResultMap = this.state.sshResultMap;
              sshResultMap[sshResult.server.id].highlight = false
              this.setState({sshResultMap: sshResultMap});
          }.bind(this), 1000);
        }

        sshResultMap[sshResult.server.id] = sshResult;
        this.setState({sshResultMap: sshResultMap, webSocket: message.target});

        sshResultMap[sshResult.server.id].update();
    },

    render: function() {
      var sshResults = _.map(this.state.sshResultMap, function(sshResult) {
          return <SshResult sshResult={sshResult}/>
      });
      
      var cancelButton;
      if (this.state.webSocket) {
        cancelButton = <Button bsStyle="danger" key="cancel" onClick={this.handleCancelExecution}>Cancel</Button>;
      }

      var executionModal;
      if (this.state.addExecutionModal) {
          executionModal = (
            <ExecutionForm groups={this.state.groups} commands={this.state.commands} 
                handleResponse={this.handleResponse} onRequestHide={this.handleModalHide} 
                handleExecutionDone={this.handleExecutionDone}/>
            );
      }

      return (
        <div>
          {executionModal}
          <ButtonBar>
              <Button bsStyle="primary" key="execution" onClick={this.handleAddExecution}>Add Execution</Button>
              {cancelButton}
          </ButtonBar>
          <div ref="items">
              {sshResults}
          </div>
        </div>  
      ); 
    }
});

module.exports=ExecutionPage;