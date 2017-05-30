import React, { Component } from 'react';
import { Divider, Accordion, Form, TextArea, Message, Reveal, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { TransactionsCollection } from '../collections/transactions.js';
import { Session } from 'meteor/session';

function StatusColor(props) {
    const reqstat = props.reqstat;
    const text = props.text;
    if (reqstat == "Accepted") {
        return <Label color='green'>{text}</Label>;
    }
    if (reqstat == 'Denied') {
        return <Label color='red'>{text}</Label>;
    }
    return <Label color='yellow'>{text}</Label>
}

export default class extends Component {
    constructor(props) {

        super(props);

        this.state = { error: null };
    };


    updateAccepted() {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yy = date.getFullYear();
        var hh = date.getHours();
        var mn = date.getMinutes();
        var durationInt = parseInt(this.props.request.duration);
        var dur = 0;
        dur = this.props.request.ddaccepted + durationInt;


        TransactionsCollection.update(this.props.request._id, {
            $set: { requeststatus: 'Accepted' },
        });
        TransactionsCollection.update(this.props.request._id, {
            $set: { ddaccepted: dd },
        });

        TransactionsCollection.update(this.props.request._id, {
            $set: { mmaccepted: mm },
        });
        TransactionsCollection.update(this.props.request._id, {
            $set: { yyaccepted: yy },
        });
        
        console.log("dur", durationInt);
        if(dur <= 30)
        {
            if( mm == 1 || mm== 3 || mm== 5 || mm== 7|| mm== 9|| mm== 11)
            {
                dur = this.props.request.ddaccepted + durationInt;
                TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            }
        }
        else
        {   
            this.props.request.ddaccepted = 1; //0
            dur = durationInt - this.props.request.ddaccepted; //
            this.props.request.mmreturn = mm + 1; //
            TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            TransactionsCollection.update(this.props.request._id, {$set: { mmreturn: this.props.request.mmreturn },});
        }

        if( dur <= 31)
        {
            if( mm == 4 || mm== 6 || mm== 8 || mm== 10|| mm== 12)
            {
                dur = this.props.request.ddaccepted + durationInt;
                TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            }
        }
        else
        {
            this.props.request.ddaccepted = 0; //0
            dur = durationInt - this.props.request.ddaccepted; //4
            this.props.request.mmreturn = mm + 1; //
            TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            TransactionsCollection.update(this.props.request._id, {$set: { mmreturn: this.props.request.mmreturn },});
        }
        
        if(dur <= 29 || dur <= 28 )
        {
            if(mm == 2)
            {
              dur = this.props.request.ddaccepted + durationInt;
              TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            }
        }
        else
        {
            this.props.request.ddaccepted = 0; //0
            dur = durationInt - this.props.request.ddaccepted; //4
            this.props.request.mmreturn = mm + 1; //
            TransactionsCollection.update(this.props.request._id, {$set: { ddreturn: dur },});
            TransactionsCollection.update(this.props.request._id, {$set: { mmreturn: this.props.request.mmreturn },});
        }
        if(mm > 12)
        {
            this.props.request.yyreturn = yy + 1;
           TransactionsCollection.update(this.props.request._id, {$set: { yyreturn: this.props.request.yyreturn },});
        }

        console.log("Return on : -> "+ this.props.request.ddreturn + " " + this.props.request.mmreturn + " " + this.props.request.yyreturn);
    }

    updateDenied() {
        TransactionsCollection.update(this.props.request._id, {
            $set: { requeststatus: 'Denied' },
        });
    }

    render() {
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
                        <Button color='green' onClick={this.updateAccepted.bind(this)} >Accept</Button>
                        <Button color='red' onClick={this.updateDenied.bind(this)} >Decline</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }


}
