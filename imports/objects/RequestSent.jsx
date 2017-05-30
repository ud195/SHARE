import React, { Component } from 'react';
import { Divider, Accordion, Form, TextArea, Message, Reveal, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { TransactionsCollection } from '../collections/transactions.js';
import { Session } from 'meteor/session';


function StatusColor(props) {
    const reqstat = props.reqstat;
    const text = props.text;

    if (reqstat == "Accepted") {
        return <Label  color='green'>{text}</Label>;
    }

    if (reqstat == 'Denied') {
        return <Label  color='red'>{text}</Label>;
    }

    return <Label  color='yellow'>{text}</Label>
}

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    };



    updateWithdraw() {
        TransactionsCollection.remove(this.props.req._id);
    }


    render() {
        let { error } = this.state;
        let { req } = this.props;
        console.log("state>>", this.state);
        console.log("props>>", this.props);

        return (
            <Card>
                <StatusColor reqstat={req.requeststatus} text={req.requeststatus} />
                <Card.Content>
                    <Card.Header>
                        Sent
                    </Card.Header>
                    <Card.Meta>
                        request id : {req._id}
                    </Card.Meta>
                    <Card.Description>
                        You want to borrow <strong> {req.receiver}'s </strong> item <strong>{req.itemname} </strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button color='black' onClick={this.updateWithdraw.bind(this)} >Withdraw</Button>
                    </div>
                </Card.Content>
            </Card>

        )
    }


}
