/** @jsx React.DOM */
'use strict';

var React = require('react'),
    PageHeader = require('react-bootstrap/PageHeader'),
    Well = require('react-bootstrap/Well'),
    Button = require('react-bootstrap/Button'),
    Panel = require('react-bootstrap/Panel'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    ExecutionForm = require('./ExecutionForm'),
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

        var sshResultMap = this.state.sshResultMap;
        if (sshResultMap[sshResult.server.id]) {
            sshResult.output = sshResultMap[sshResult.server.id].output + sshResult.output;
        }

        sshResultMap[sshResult.server.id] = sshResult;
        this.setState({sshResultMap: sshResultMap, webSocket: message.target});
        var childNodes = this.refs.items.getDOMNode().childNodes;
        _.each(childNodes, function(child) {
            child.childNodes[1].scrollTop = child.childNodes[1].scrollHeight;
        });
    },

    render: function() {
      var divStyle = {
          height: '400'
      };
      var sshResults = _.map(this.state.sshResultMap, function(sshResult) {
          return (
              <Panel header={<b>{sshResult.server.name}</b>}>
                <pre className={sshResult.success ? "" : "bg-danger"}>{sshResult.output}</pre>
              </Panel>
          );
      });
      var cancelButton;
      if (this.state.webSocket) {
        cancelButton = <Button bsStyle="danger" key="cancel" onClick={this.handleCancelExecution}>Cancel</Button>;
      }

      return (
        <div>
          {this.state.addExecutionModal ? <ExecutionForm groups={this.state.groups} commands={this.state.commands} 
              handleResponse={this.handleResponse} onRequestHide={this.handleModalHide} handleExecutionDone={this.handleExecutionDone}/> : <span/>}
          <PageHeader>Executions</PageHeader>
          <Well>
              <ButtonToolbar>
                  <Button bsStyle="primary" key="execution" onClick={this.handleAddExecution}>Add Execution</Button>
                  {cancelButton}
              </ButtonToolbar>
          </Well>
          <div ref="items">
              {sshResults}
          </div>
        </div>  
      ); 
    }
});

module.exports=ExecutionPage;