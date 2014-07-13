/** @jsx React.DOM */
'use strict';

var React = require('react'),
    HeaderBar = require('../components/HeaderBar'),
    TogglePanel = require('../components/TogglePanel');

var Command = React.createClass({
    render: function() {
      var command = this.props.command;
      var removeAction = {action: this.props.deleteCommand.bind(null, command.id), icon: "trash"};

      return (
          <TogglePanel title={command.name} actions={[removeAction]} key={command.id} initialIsOpen={false}>
              <div>
                  <p><b>Notes: </b>{command.note}</p>
                  <p><b>Command: </b>{command.script}</p>
              </div>
          </TogglePanel>
        )
    }
});

module.exports=Command;