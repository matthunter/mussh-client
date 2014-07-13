/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Grid = require('../components/Grid'),
    TogglePanel = require('../components/TogglePanel'),
    Server = require('./Server'),
    _ = require('underscore');


var ServerGroup = React.createClass({
    render: function() {
      var servers = _.map(this.props.group.servers, function (server, index) {
          return <Server server={server} key={server.id} deleteServer={this.props.deleteServer.bind(null, server.id)}/>
      }, this);
      var removeAction = {icon: "trash", action: this.props.deleteGroup.bind(null, this.props.group.id)}

      return (
         <TogglePanel title={this.props.group.name} actions={[removeAction]} key={this.props.index}>
            <Grid numCols={3} fluid={true}>
              {servers}
            </Grid>
         </TogglePanel>
      );
    }
});

module.exports = ServerGroup;