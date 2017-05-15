import React, { Component } from 'react';
import { Divider, Accordion, Form, TextArea, Message, Reveal, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { TransactionsCollection } from '../collections/transactions.js';
import { Session } from 'meteor/session';


function StatusColor(props) {
  const reqstat = props.stat;
  const text = props.text;
  if (reqstat == 'Accepted') {
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
        this.state = {

            error: null
        };
    };



    updateAccepted() {
        TransactionsCollection.update(this.props.borrowrequest._id, {
            $set: { requeststatus: 'Accepted' },
        });
    }

    updateDenied() {
        TransactionsCollection.update(this.props.borrowrequest._id, {
            $set: { requeststatus: 'Denied' },
        });
    }

        updateWithdraw() {
        TransactionsCollection.remove(this.props.borrowrequest._id);
    }


    render() {

        let { error } = this.state;
        let { borrowrequest } = this.state;
        let { receivedrequest } = this.state;
        console.log("state>>", this.state);
        console.log("props>>", this.props);
        //console.log("user>>", user);
        return (
            <div>
                {borrowrequest ?
                    <div> <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Sent
                        </Card.Header>
                                <Card.Meta>
                                    {borrowrequest._id}}
                        </Card.Meta>
                                <Card.Description>
                                    {borrowrequest.sender} wants to borrow your  <strong>ITME NAME </strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>

                                <Button color='black' onClick={this.updateWithdraw.bind(this)}>Withdraw</Button>

                                </div>
                            </Card.Content>
                        </Card> </Card.Group>
                    </div>
                    :
                    <h1> error mounting sent  </h1>}



                {receivedrequest ?
                    <div> <Card.Group>
                        <Card>
                          <StatusColor reqstat={borrowrequest.requeststatus} text={borrowrequest.requeststatus} />
                            <Card.Content>
                                <Card.Header>
                                    Received
                        </Card.Header>
                                <Card.Meta>
                                    Item NAME
                        </Card.Meta>
                                <Card.Description>
                                    {borrowrequest.sender} wants to borrow your  <strong>ITME NAME </strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                 <Button color='green' onClick={this.updateAccepted.bind(this)}>Accept</Button>
                                 <Button color='red' onClick={this.updateDenied.bind(this)}>Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>                    </Card.Group>

                    </div>
                    :
                    <h1> error mounting sent  </h1>}                    
            </div>
        )
    }

    componentDidMount() {
        this.LoadRequest();
    }


    LoadRequest() {
           let borrowrequest = TransactionsCollection.find({ "sender": Session.get('user') });
        let receivedrequest = TransactionsCollection.find({ "receiver": Session.get('user') });

        if (borrowrequest && receivedrequest) {
            this.setState({ borrowrequest: borrowrequest });
            this.setState({ receivedrequest: receivedrequest });

            console.log("request Mount ::: >>",borrowrequest);
        }
        else {
            this.setState({ error: "Error>>>" });
        }
    }


}