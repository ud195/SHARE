import React, { Component } from 'react';
import { Container, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
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
        return (
            <div>
                <Container>
                    {requestsCount > 0 ?
                        <Segment.Group>
                            <Segment><Header><Icon name='database'/>db</Header></Segment>
                            <Grid.Column>
                                {requests.map(request => this.renderRequests(request))}
                            </Grid.Column>
                        </Segment.Group>
                        : <Message size='huge'>You don't have any requests yet.</Message>
                    }
                </Container>
            </div>
        )
    }

    componentDidMount() {
        this.loadRequests();
    }

    loadRequests() {
        let requests = TransactionsCollection.find({ "sender": Session.get('user').username }).fetch();
        let requestsCount = TransactionsCollection.find({ "sender": Session.get('user').username  }).count();
        if (requests) {
            this.setState({ requests: requests });
            this.setState({ requestsCount: requestsCount });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }

    renderRequests(requests) {
        return (
            <div key={request._id}>
                <Segment>
                    <RequestComponent key={request._id} request={request} />
                </Segment>
            </div>        );
    }
}
