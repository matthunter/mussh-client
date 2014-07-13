/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Button = require('react-bootstrap/Button'),
    Glyphicon = require('react-bootstrap/Glyphicon'),
    _ = require('underscore');

var HeaderBar = React.createClass({
    render: function() {
        var title = <b>{this.props.title}</b>;
        var titleBar = <a href="#" className="panel-title" onClick={this.props.toggle}>{title}</a>;

        var actionButtons = _.map(this.props.actions, function(action) {
            return (<Button key={action.icon} bsSize="xsmall" bsStyle="link" onClick={action.action}>
                        <Glyphicon glyph={action.icon}/>
                    </Button>);
        }, this);

        return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-6">{this.props.toggle ? titleBar : title}</div>
                  <div className="col-md-6">
                    <span className="pull-right">
                        {actionButtons}
                    </span>
                  </div>
              </div>
          </div>
        );
    }
});

module.exports=HeaderBar;