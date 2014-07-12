/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    Grid = require('../components/Grid'),
    HeaderBar = require('../components/HeaderBar'),
    Server = require('./Server'),
    _ = require('underscore');


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

module.exports = ServerGroup;