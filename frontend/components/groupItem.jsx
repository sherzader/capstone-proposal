var React = require('react');
var ReactDOM = require('react-dom');
var GroupStore = require('../stores/group');
var UserStore = require('../stores/user');
var ApiUtil = require('../util/apiUtil');

var GroupItem = React.createClass({
  getInitialState: function () {
    return({current_user: UserStore.findUserById(window.CURRENT_USER.id),
            users_group: GroupStore.allUsersGroups(),
            join_text: "Join"
          });
  },
  componentDidMount: function(){
    this.groupListener = GroupStore.addListener(this._onChange);
    ApiUtil.fetchCurrentUser(window.CURRENT_USER.id);
  },
  componentWillUnmount: function () {
    this.groupListener.remove();
  },
  _onChange: function () {
    this.setState({users_group: GroupStore.allUsersGroups()});

    if(this.state.users_group.length !== 0){
      this.state.users_group.forEach(function (group) {
        if (group.id === this.props.group.id){
          var node = ReactDOM.findDOMNode(this.refs.toggle);

        }
      }.bind(this))
    }
  },
  _toggleGroup: function (e) {
    e.stopPropagation();
    var that = this;
    var node = ReactDOM.findDOMNode(this.refs.toggle);

    if (e.currentTarget.innerHTML === "Join"){
      ApiUtil.createUsersGroup(this.props.group, function () {
        that.setState({join_text: "Leave"});
      });
    } else {
        ApiUtil.destroyUsersGroup(this.state.users_group[0], function () {
          that.setState({join_text: "Join"});
      });
    }
  },
  render: function () {
    return(
    <div>
        <div className="block"
             key={this.props.group.id}
             onClick={this.props.onClick}>
             <h3>{this.props.group.title}</h3>
             <dl>
             <dt>Where: {this.props.group.location}</dt>
             <dt>About Us:<br />{this.props.group.body}</dt>
            </dl>
           <a href="#" ref="toggle" onClick={this._toggleGroup}>{this.state.join_text}</a>
        </div>
    </div>
    );
  }
});

module.exports = GroupItem;
