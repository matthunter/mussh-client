/** @jsx React.DOM */
'use strict';

var React = require('react'),
    PageHeader = require('react-bootstrap/PageHeader'),
    Button = require('react-bootstrap/Button'),
    ButtonBar = require('../components/ButtonBar'),
    ServerForm = require('./ServerForm'),
    GroupForm = require('../group/GroupForm'),
    ServerGroup = require('./ServerGroup'),
    _ = require('underscore'),
    $ = require('jquery');

var ServerPage = React.createClass({
    loadServers: function() {
        $.get('http://localhost:7979/groups',
          function(groups) {
              this.setState({groups: _.sortBy(groups, function(group) {
                  return group.name.toLowerCase();
              })});
          }.bind(this));
    },

    deleteServer: function(serverId) {
        $.ajax({
             url: 'http://localhost:7979/servers/' + serverId,
             type: 'DELETE'
        }).done(function() {
          this.loadServers();
        }.bind(this));
    },  

    deleteGroup: function(groupId) {
        $.ajax({
             url: 'http://localhost:7979/groups/' + groupId,
             type: 'DELETE'
        }).done(function() {
          this.loadServers();
        }.bind(this));
    },  

    componentWillMount: function() {
        this.loadServers();
    },

    getInitialState: function() {
        return {groups: [], addServerModal: false, addGroupModal:false};
    },

    handleAddServer: function() {
        this.setState({addServerModal: true});
    },

    handleAddGroup: function() {
        this.setState({addGroupModal:true});
    },

    handleModalHide: function() {
        this.setState({addServerModal:false, addGroupModal:false});
        this.loadServers();
    },

    render: function() {
      var serverGroups = _.map(this.state.groups, function (group, index) {
          return <ServerGroup group={group} index={index} key={group.id} 
                      deleteServer={this.deleteServer} deleteGroup={this.deleteGroup}/>
      }, this);

      var serverModal;
      if (this.state.addServerModal) {
          serverModal = <ServerForm groups={this.state.groups} onRequestHide={this.handleModalHide}/>;
      }
      var groupModal;
      if (this.state.addGroupModal) {
          groupModal = <GroupForm onRequestHide={this.handleModalHide}/>;
      }

      return (
        <div>
          {serverModal}
          {groupModal}
          <ButtonBar>
              <Button bsStyle="primary" key="group" onClick={this.handleAddGroup}>Add Group</Button>
              <Button bsStyle="primary" key="server" onClick={this.handleAddServer}>Add Server</Button>  
          </ButtonBar>
          {serverGroups}
        </div>  
      ); 
    }
});

module.exports=ServerPage;