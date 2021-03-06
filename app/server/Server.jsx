/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Table = require('react-bootstrap/Table'),
    HeaderBar = require('../components/HeaderBar');

var Server = React.createClass({
    render: function() {
        var server = this.props.server;
        var removeAction = {action: this.props.deleteServer, icon: "trash"};
        return (
          <div>
            <HeaderBar title={server.name} actions={[removeAction]}/>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Addr:</td>
                  <td>{server.addr}</td>
                </tr>
                <tr>
                  <td>Port:</td>
                  <td>{server.port}</td>
                </tr>
                <tr>
                  <td>Tunnel:</td>
                  <td>{server.tunnel}</td>
                </tr>
                <tr>
                  <td>Base Directory:</td>
                  <td>{server.basedir}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )
    }
});

module.exports=Server;