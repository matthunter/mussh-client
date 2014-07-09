/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    PageHeader = require('react-bootstrap/PageHeader'),
    Well = require('react-bootstrap/Well'),
    Button = require('react-bootstrap/Button'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    Grid = require('../components/Grid'),
    HeaderBar = require('../components/HeaderBar'),
    Server = require('./Server'),
    ServerForm = require('./ServerForm'),
    GroupForm = require('../group/GroupForm'),
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

      return (
        <div>
          {this.state.addServerModal ? <ServerForm groups={this.state.groups} onRequestHide={this.handleModalHide}/> : <span/>}
          {this.state.addGroupModal ? <GroupForm onRequestHide={this.handleModalHide}/> : <span/>}
          <PageHeader>Servers</PageHeader>
          <Well>
              <ButtonToolbar>
                  <Button bsStyle="primary" key="group" onClick={this.handleAddGroup}>Add Group</Button>
                  <Button bsStyle="primary" key="server" onClick={this.handleAddServer}>Add Server</Button>  
              </ButtonToolbar>
          </Well>
          {serverGroups}
        </div>  
      ); 
    }
});

var ServerGroup = React.createClass({
    render: function() {
      var servers = _.map(this.props.group.servers, function (server, index) {
          return <Server server={server} key={server.id} deleteServer={this.props.deleteServer.bind(null, server.id)}/>
      }, this);

      return (
         <Panel header={<HeaderBar title={this.props.group.name} handleRemove={this.props.deleteGroup.bind(
              null, this.props.group.id)}/>} key={this.props.index}>
            <Grid numCols={3} fluid={true}>
              {servers}
            </Grid>
         </Panel>
      );
    }
});

module.exports=ServerPage;