var React = require('react');
var GroupStore = require('../stores/group');
var ApiUtil = require('../util/apiUtil');
var Search = require('./search.jsx');

var GroupItem = React.createClass({
  handleClick: function(e){
    ApiUtil.fetchGroup(e.id);
  },
  render: function () {
    return(
      <div className="group-item container-fluid"
        key={this.props.group.id}
        onClick={this.handleClick}>
          <br /><br />
          Name: {this.props.group.title}
          <br />
          Where: {this.props.group.location}
          <br />
          About Us: {this.props.group.body}
          <br /><br />
      </div>
    );
  }
});

module.exports = GroupItem;
