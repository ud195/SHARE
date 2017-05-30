import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { MessageCollection } from '../collections/messages.js';
import { Header, Grid, Card, TextArea, Input, Icon, Image, Button, Divider, Form, Segment, Table } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { ItemCollection } from '../collections/items.js';

import Message from '../objects/message.jsx';

function ButtonsDisplayed(props) {
	const submit = props.submit;
	const gotologin = props.gotologin;

	if (Session.get('user') == null) {
		return (<Button circular icon='content' onClick={gotologin} content='Login to comment'></Button>);
	}
	else
		return (<Button circular inverted icon='send' color='green' content='Submit' onClick={submit} />);
}


class MessageAPI extends Component {

	constructor(props) {
		super(props);

		this.state =
			{
				item : null,
				error : '',
				MessageContent: '',
				MessageOwner: '',
				ItemID:''
			}

		this.updateStateMessageContent = this.updateStateMessageContent.bind(this);
		this.updateStateMessageOwner = this.updateStateMessageOwner.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	updateStateMessageContent(event) { this.setState({ MessageContent: event.target.value }); }
	updateStateMessageOwner(event) { this.setState({ MessageOwner: event.target.value }); }

	redirectlogin() {
		hashHistory.push('login');
	}

	handleSubmit() {

		var Content = this.state.MessageContent;
		var Owner = Session.get('user').username;
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yy = date.getFullYear();
		var hh = date.getHours();
		var mn = date.getMinutes();

		console.log("Content: " + this.state.MessageContent);
		console.log("Owner: " + this.state.MessageOwner);
		console.log("Status: " + date.toString);

		MessageCollection.insert({ Content, Owner, dd, mm, yy, hh, mn });
	}

	renderMessageList() {
		return this.props.messages.map((message) => (
			<Message key={message._id} message={message} />
		));
	}

	render() {
  		  let { item } = this.state;
		console.log("item prop ??> ",item);
		console.log("props ??.>>>" );
		return (
			<div>
				<Grid centered columns={3}>
					<Grid.Row>
						<Grid.Column width={2}>
							<Icon name='comment' color='green' size='big' />
						</Grid.Column>

						<Grid.Column width={11}>
							<Form inverted size='small'>
								<Form.Field>
									<TextArea color='green' value={this.props.MessageContent} onChange={this.updateStateMessageContent} autoHeight />
								</Form.Field>
							</Form>
						</Grid.Column>

						<Grid.Column width={3}>
							<ButtonsDisplayed submit={this.handleSubmit.bind(this)} gotologin={this.redirectlogin.bind(this)} />
						</Grid.Column>
					</Grid.Row>
				</Grid>


				<Segment>
					<Header as='h2'>
						<Icon name='send outline' />
						<Header.Content>
							Comments
						</Header.Content>
					</Header>
				</Segment>
				<Segment>
					{this.renderMessageList()}
				</Segment>
			</div>
		);
	}

    componentDidMount() 
	{
				this.LoadItem();
	}

  LoadItem() {
    let item = ItemCollection.findOne({ "_id": this.props.item._id });
    if (item) {
      this.setState({ item: item });
      console.log("Item Mount ::: >>", item);
    }
    else {
      this.setState({ error: "Error>>>" });
    }
  }

}


export default createContainer(() => {
	return {
		messages: MessageCollection.find({}, { sort: { createdAt: -1 } }).fetch()
	};
}, MessageAPI);