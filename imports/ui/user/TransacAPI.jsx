import React, { Component } from 'react';
import { Container, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { TransactionsCollection } from '../../collections/transactions.js';
import RequestSentComponent from '../../objects/RequestSent.jsx';
import RequestReceivedComponent from '../../objects/RequestReceived.jsx';

import { Session } from 'meteor/session';

export default class TransacAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            requestsSent: null,
            requestsReceived : null,
            requestsReceivedCount: null,
            requestsSentCount : null
        };
    };

    render() {
        let { error, requestsSent, requestsReceived, requestsReceivedCount, requestsSentCount } = this.state;

        return (
            <div>

                
                <Segment>
                <Header><Icon name='arrow right' />Requests Sent</Header>
                {requestsSentCount > 0 ?
                       <Card.Group>
                            {requestsSent.map(req => this.renderSent(req))}
                       </Card.Group>
                    : <Message size='huge'>You didn't send any borrowal requests yet.</Message>  }               
                </Segment>

                <Segment>
                <Header><Icon name='arrow left' />Requests Received</Header>
                {requestsReceivedCount > 0 ?
                       <Card.Group>
                            {requestsReceived.map(request => this.renderReceived(request))}
                       </Card.Group>
                    : <Message size='huge'>You didn't receive any borrowal requests yet.</Message> }
                </Segment>

             </div>

        )
    }

    componentDidMount() {
        this.LoadRequests();
    }

    LoadRequests() {
        let requestsSent = TransactionsCollection.find({ sender : Session.get('user').username }).fetch();
        let requestsSentCount = TransactionsCollection.find({ sender : Session.get('user').username }).count();
        let requestsReceived = TransactionsCollection.find({ receiver : Session.get('user').username }).fetch();
        let requestsReceivedCount = TransactionsCollection.find({ receiver : Session.get('user').username }).count();


        if (requestsSent || requestsReceived) {
            this.setState({ requestsSent: requestsSent });
            this.setState({ requestsReceived: requestsReceived });
            this.setState({ requestsReceivedCount: requestsReceivedCount });
            this.setState({ requestsSentCount: requestsSentCount });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }

    renderSent(req) {
        return (
            <div>
           <RequestSentComponent key={req._id} req={req} />
           </div>
        );
    }

        renderReceived(request) {
        return (
            <div>
           <RequestReceivedComponent key={request._id} request = {request}/>
           </div>
        );
    }
}
