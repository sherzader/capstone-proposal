var React = require('react');
var ApiUtil = require('../util/apiUtil');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var EventStore = require('../stores/event');

var EditEvent = React.createClass({
  mixins: [LinkedStateMixin],

  blankAttrs: {
    title: '',
    location: '',
    body: '',
    date: ''
  },

  getInitialState: function () {
    var group_event = EventStore.findEventById(this.props.params.id);
    return (this.blankAttrs, {group_event: group_event}) ;
  },

  handleChange: function (e) {
    this.setState({location: e.target.value});
  },
  _editEvent: function (e) {
    e.preventDefault();

    ApiUtil.editEvent(this.state.group_event, function () {
      this.props.history.push("/events/" + this.state.group_event.id);
    }.bind(this));
  },

  render: function () {
    return(
      <div>
        <form className='edit-event' onSubmit={this._editEvent}>
          <table>
            <tr>
              <td>
              <label htmlFor='event_title'>Name:</label>
              </td>
              <td>
              <input
                type='text'
                id='event_title'
                valueLink={this.linkState("title")} />
              </td>
            </tr>
            <tr>
              <td>
              <label htmlFor='event_body'>About Event:</label>
              </td>
              <td>
              <input
                type='text'
                id='event_body'
                valueLink={this.linkState("body")}
              />
            </td>
            </tr>
            <tr>
              <td>
              <label htmlFor='event_location'>Location: </label>
              </td>
              <td>
                <input
                  type='text'
                  id='event_location'
                  valueLink={this.linkState("location")}
                />
              </td>
            </tr>
            <tr>
              <td>
              <label className="fa fa-calendar" htmlFor='event_date'></label>
              </td>
              <td>
                <input
                  type='date'
                  id='event_date'
                  valueLink={this.linkState("date")}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="btn btn-primary">Update Event</button>
              </td>
            </tr>
          </table>
          <br />
        </form>
      </div>
    );
  }
});

module.exports = EditEvent;