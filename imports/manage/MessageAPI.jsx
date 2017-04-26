import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { MessageCollection } from '../collections/messages.js';
import { Header, Card, Input, Icon, Image, Button, Divider, Form, Segment, Table } from 'semantic-ui-react';

const colors = [
	'teal'
]

import Message from '../objects/message.jsx';

class MessageAPI extends React.Component {

	constructor(props) {
		super(props);

		var CurrentDate = new Date();
		this.state =
			{
				MessageContent: '',
				MessageOwner: 'Share-admin',
			}

		this.updateStateMessageContent = this.updateStateMessageContent.bind(this);
		this.updateStateMessageOwner = this.updateStateMessageOwner.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	updateStateMessageContent(event) { this.setState({ MessageContent: event.target.value }); }
	updateStateMessageOwner(event) { this.setState({ MessageOwner: event.target.value }); }


	handleSubmit() {
		var Content = this.state.MessageContent;
		var Owner = this.state.MessageOwner;
		date = new Date();
		console.log("Content: " + this.state.MessageContent);
		console.log("Owner: " + this.state.MessageOwner);
		console.log("Status: " + date);

		MessageCollection.insert({ Content, Owner, date });
	}

	renderMessageList() {
		return this.props.messages.map((message) => (
			<Message key={message._id} message={message} />
		));
	}

	render() {
		return (
			<div>
				<Segment.Group>
					<Segment>
						<Header as='h2'>
							<Icon name='send outline' />
							<Header.Content>
								Leave a Comment
							</Header.Content>
						</Header>
					</Segment>

					<Segment.Group horizontal>
						<Segment inverted color='teal' raised circular>
							<Form inverted size='small'>

								<Form.Field>
									<label>Message Content</label>
									<Input type="text" value={this.state.MessageContent} onChange={this.updateStateMessageContent} />
								</Form.Field>
								<Divider hidden />

								<Form.Field>
									<label>Message Owner</label>
									<Input icon="user" type="text" value={this.state.MessageOwner} onChange={this.updateStateMessageOwner} />
								</Form.Field>
								<Divider hidden />
							</Form>
							<Button icon='send' color='blue' content='Submit' onClick={this.handleSubmit} />
						</Segment>
					</Segment.Group>
				</Segment.Group>

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
}

MessageAPI.propTypes = {
	messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		messages: MessageCollection.find({}, { sort: { createdAt: -1 } }).fetch()
	};
}, MessageAPI);