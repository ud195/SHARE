import React, { Component } from 'react';
import { Grid, Menu, Dimmer, Header, Form, Segment, Card, Icon, Image, Divider, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import { Header, Message, Grid, Card, Input, Icon, Image, Button, Divider, Form, Segment, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from './NotFoundPage.jsx';
import { ItemCollection } from '../collections/items.js';
import { TransactionsCollection } from '../collections/transactions.js';

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            error: null,
                  createdAt: null,
      duration: "", // length of transaction duration
      type: "", //pickup or delivery
      requeststatus: "", // accepted/denied/received
      itemId: "", // item id 
      sender: Session.get('user').username,
      price: '',
      priority: '',
      receiver: null // request sent to owner of the item 
    
        };
    };


HandleClickBorrow()
{
  this.LoadItem();
  this.setState({active : true});
}

handleHide()
{
  this.setState({active : false});
}


    render() {
        const {active} = this.state;
        let { item, error } = this.state;
        console.log("state>>", this.state);
        return (
                                                <Dimmer.Dimmable  dimmed={active}>

                <Grid>

                      <Grid.Row columns={3}>
                        <Grid.Column width = {3}>
                        </Grid.Column>
                        <Grid.Column width = {10}>
                            {item ?
                            <div>
                            <Item>
                            <Item.Image size='medium' src={item.imageUrl} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>{item.Name}</Item.Header>
                                <Divider/>
                                <Item.Description>{item.description}</Item.Description>
                                <Item.Extra>
                                <Button onClick={this.HandleClickBorrow.bind(this)} size ='huge' floated='left'>
                                    Borrow
                                </Button>
                                </Item.Extra>
                            </Item.Content>
                            </Item> </div> 
                            : <NotFoundPage/>}               
                            

                         </Grid.Column >
                            <Grid.Column width = {3}>
                        </Grid.Column>
                    </Grid.Row> 
                </Grid> 
                            <Dimmer page active={active} onClickOutside={this.handleHide}>

            {item ?
              <div>
                <Form size='small'>
                  <Form.Field>
                    <Header as='h4' block>Duration of borrowal (days)</Header>
                    <Input type="text" placeholder="e.g. 4"
                      value={this.state.duration}
                      onChange={this.onDurationChange.bind(this)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Header as='h4' block>Request Priority</Header>
                    <select value={this.state.priority}
                      onChange={this.onRequestPriorityChange.bind(this)}
                    >
                      <option value='high'>High</option>
                      <option value='medium'>Medium</option>
                      <option value='low'>Low</option>
                    </select>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h4' block>Exchange Type</Header>
                    <select value={this.state.type}
                      onChange={this.onExchangeTypeChange.bind(this)}
                    >
                      <option value='delivery'>Delivery</option>
                      <option value='pickup'>Pickup</option>
                    </select>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h4' block>Proposed Price ($)</Header>
                    <Input type="text" placeholder="e.g. 4"
                      value={this.state.price}
                      onChange={this.onPriceChange.bind(this)}
                    />
                  </Form.Field>
                  <Button.Group>
                  <Button onClick={this.onBorrowalSubmit.bind(this)} icon='mail' color='blue' content='Submit' />
                  <Button.Or content='or' />
                  <Button onClick={this.handleHide.bind(this)} icon='remove' color='red' content='Cancel' />
                  </Button.Group>
                </Form>
              </div>

              :
              <h1> error mounting  </h1>}
                            
                              </Dimmer>       

                                    </Dimmer.Dimmable>

        )
    }

    componentDidMount() {
        this.LoadItem();
    }

  onDurationChange(e) {
    this.setState({ duration: e.target.value });
  }

  onRequestPriorityChange(e) {
    this.setState({ priority: e.target.value });
  }
  onExchangeTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  onPriceChange(e) {
    this.setState({ price: e.target.value });
  }

    LoadItem() {
        let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (item) {
            this.setState({ item: item });
        }
        console.log("items-->", item);
    }


      onBorrowalSubmit(e) {
    e.preventDefault();
    console.log("submited..", this.state);
    let request = {
      createdAt: new Date(),
      duration: this.state.duration, // length of transaction duration
      type: this.state.type, //pickup or delivery
      requeststatus: 'sent', // accepted/denied/received
      itemId: this.state.itemId, // item id 
      price: this.state.price,
      priority: this.state.priority,
      error: this.state.error,
      receiver: this.state.receiver, // receiver 
      sender: Session.get('user').username
    }

    TransactionsCollection.insert(
      {
        receiver: request.receiver, sender: request.sender, item_id: request.item_id,
        createdAt: request.createdAt, priority: request.priority, price: request.price,
        duration: request.duration, type: request.type, requeststatus: request.requeststatus
      }
    );
    this.handleHide();
  }
}
