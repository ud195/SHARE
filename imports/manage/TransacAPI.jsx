import React, { Component } from 'react';
import { Container, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { TransactionsCollection } from '../collections/transactions.js';
import RequestComponent from '../objects/RequestTable.jsx';
import { Session } from 'meteor/session';

export default class TransacAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            requests: null,
            requestsCount: null
        };
    };

    render() {
        let { error, requests, requestsCount } = this.state;
        console.log("state>>", this.state);
        console.log("props>>", this.props);
        console.log("user>>", Session.get('user').username);
        return (
            <div>
                <Container>
                <Header as='h3'>
                    <a href={`#/items/uploaditem`}>
                        <Icon.Group size='large'>
                            <Icon name='database' />
                            <Icon corner name='add' />
                        </Icon.Group>
                        Upload Item
                    </a>
                </Header>
                {requestsCount > 0 ?
                    <Segment.Group>
                        <Segment><Header><Icon name='database' />Listed Items</Header></Segment>
                        <List horizontal relaxed='very'>
                            {requests.map(request => this.renderItems(request))}
                        </List>
                    </Segment.Group>
                    : <Message size='huge'>You don't have any uploaded items yet.<br />add now</Message>
                }
                </Container>
            </div>
        )
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        let requests = TransactionsCollection.find({ sender : Session.get('user').username }).fetch();
        let requestsCount = TransactionsCollection.find({ sender : Session.get('user').username }).count();
        if (requests) {
            this.setState({ requests: requests });
            this.setState({ requestsCount: requestsCount });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items-->", requests);
    }

    renderItems(request) {

        // <Accordion key={item._id} panels={panels} exclusive={false} fluid />
        return (
            <List.Item>
           <RequestComponent key={request._id} request={request} />
           </List.Item>
        );
    }
}
