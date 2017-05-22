import React, { Component } from 'react';
import { Divider, Accordion, Form, TextArea, Message, Reveal, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { TransactionsCollection } from '../collections/transactions.js';
import { Session } from 'meteor/session';


function StatusColor(props) {
  const reqstat = props.reqstat;
  const text = props.text;
  if (reqstat == "Accepted") {
    return <Label ribbon color='green'>{text}</Label>;
  }
  if (reqstat == 'Denied') {
    return <Label ribbon color='red'>{text}</Label>;
  }
  return <Label ribbon color='yellow'>{text}</Label>
}

export default class extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {error: null};
    };


    updateAccepted() {
        TransactionsCollection.update(this.props.request._id, {
            $set: { requeststatus: 'Accepted' },
        });
    }

    updateDenied() {
        TransactionsCollection.update(this.props.request._id, {
            $set: { requeststatus: 'Denied' },
        });
    }

    render() 
    {
        let { error } = this.state;
        let { request } = this.props;
        console.log("state>>", this.state);
        console.log("Received Props >>", this.props);
        console.log("Received Request ID  -- >", request._id);

        return (
                        <Card>
                          <StatusColor reqstat={request.requeststatus} text={request.requeststatus} />
                            <Card.Content>
                                <Card.Header>
                                    Received
                                 </Card.Header>
                                <Card.Meta>
                                  request id : {request._id}
                                </Card.Meta>
                                <Card.Description>
                                  <strong>{request.sender} </strong> wants to borrow your item <strong>{request.itemname} </strong>
                                    <h4> Duration (days) :  {request.duration} </h4>
                                    
                                    <h4> Proposed Price ($) :  {request.price} </h4>
                                    
                                    <h4> Priority :  {request.priority} </h4>                              
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                 <Button color='green' onClick = {this.updateAccepted.bind(this)} >Accept</Button>
                                 <Button color='red' onClick={this.updateDenied.bind(this)} >Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>   
        )
    }


}
