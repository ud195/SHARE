import React, { Component, PropTypes } from 'react';
import { MessageCollection } from '../collections/messages.js';
import { Icon, Image, Grid, Segment, Divider, Label, Input, Table, Comment } from 'semantic-ui-react';
import { Session } from 'meteor/session';


// Task component - represents a single todo message
export default class Message extends Component {

 constructor(props) {
        super(props);
        this.state = {
        };
    };
  
  log()
  {
        console.log("USER SESSION" , Session.get('user'));
  }

  removeMessage() {
    MessageCollection.remove(this.props.message._id);
  }

  render() {
      let {user} = this.props;
      this.log();
      const source = 'http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg';
    return (

      <Comment>
        <Grid columns={3} >
          <Grid.Row >
            <Grid.Column width={2}>
              <Image src={source} size='medium' />
              <Comment.Author>{this.props.message.Owner}</Comment.Author>
            </Grid.Column>

            <Grid.Column width={2}>
              <Comment.Content>
                <Comment.Metadata>
                  <Grid.Row >
                  <Label.Group circular size='small'>
                  <Grid.Row>
                  <Label circular color='red' horizontal>  {this.props.message.dd}</Label>
                  <Label circular color='blue' horizontal>{this.props.message.mm}</Label>
                  </Grid.Row>
                  <Grid.Row>
                  <Label color='yellow' horizontal>{this.props.message.yy}</Label>
                  </Grid.Row>
                    <Label color='green' horizontal>{this.props.message.hh} : {this.props.message.mn}</Label>                  
                    </Label.Group>
                  </Grid.Row>
                </Comment.Metadata>
              </Comment.Content>
            </Grid.Column>

            <Grid.Column width={12}>
              <Comment.Text>
                <Segment>{this.props.message.Content}</Segment>
              </Comment.Text>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Comment> 
    

    );
  }

      componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        console.log("props", this.props);
        let user = Meteor.users.findOne({ username: Session.get('user'.username) });
        if (user) {
            this.setState({ user: user });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }
}
