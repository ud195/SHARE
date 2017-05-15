import React, { Component, PropTypes } from 'react';
import { MessageCollection } from '../collections/messages.js';
import { Icon, Input, Table, Comment } from 'semantic-ui-react';


// Task component - represents a single todo message
export default class Message extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    MessageCollection.update(this.props.message._id, {
      $set: { checked: !this.props.message.checked },
    });
  }
 
  removeMessage() {
    MessageCollection.remove(this.props.message._id);
  }

  render() {
    const messageClassName = this.props.message.checked ? 'checked' : '';

    return (
      
        <Comment>
      <Comment.Avatar src='https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png' />
      <Comment.Content>
        <Comment.Author as='a'>{this.props.message.Owner}}</Comment.Author>
        <Comment.Metadata>
          <div>Now</div>
        </Comment.Metadata>
        <Comment.Text>{this.props.message.Content}</Comment.Text>
      </Comment.Content>
    </Comment>

    );
  }
}
 
Message.propTypes = {
  message: PropTypes.object.isRequired,
};