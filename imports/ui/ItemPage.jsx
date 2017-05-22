import React, { Component } from 'react';
import { Grid, Menu, Dimmer, Header, Form, Segment, Card, Icon, Image, Divider, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import { Header, Message, Grid, Card, Input, Icon, Image, Button, Divider, Form, Segment, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from './NotFoundPage.jsx';
import { ItemCollection } from '../collections/items.js';
import { TransactionsCollection } from '../collections/transactions.js';

function ButtonsDisplayed(props) {
  const stat = props.stat;
  const direct = props.direct;
  const gotoedit = props.gotoedit;
  const checkuser = props.checkuser;
  const gotologin = props.gotologin;

  if (Session.get('user') == null) {
    return (<Button icon='content' onClick={gotologin} content='Login to borrow'></Button>);
  }
  else if (checkuser == Session.get('user').username) {
    return (<Button icon='content' onClick={gotoedit} color='violet' content='Edit'></Button>);
  }
  else if (stat == 'Not-Available') {
    return (<Button onClick={direct} icon='question' color='yellow' content='Availability'></Button>);
  }

  return (<Button onClick={direct} icon='add to cart' color='green' content='Borrow'></Button>);
}



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
      sender: "",
      price: '',
      priority: '',
      receiver: null // request sent to owner of the item 

    };
  };

  redirectedit() {
    this.LoadItem();
    //items/:id
    hashHistory.push(`/items/${this.state.item._id}/edit`);
  }

  redirectlogin() {
    hashHistory.push('login');
  }

  HandleClickBorrow() {
    this.LoadItem();
    this.setState({ active: true });
  }


  handleHide() {
    this.setState({ active: false });
  }


  render() {
    const {stat} = this.props;
    const { active } = this.state;
    let { item, error } = this.state;
    console.log("state>>", this.state);
    return (
      <Dimmer.Dimmable dimmed={active}>

        <Grid>

          <Grid.Row columns={3}>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10}>
              {item ?
                <Grid divided='vertically'>
                  <Grid.Row columns={2}>

                    <Grid.Column width={8}>
                      <Image fluid src={item.imageUrl} />
                    </Grid.Column>

                    <Grid.Column width={8}>
                      <Grid.Row columns={6} color='violet'>
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'} >
                            <Icon name='magic' />
                            <Header.Content>
                              id :  {item._id}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='registered' />
                            <Header.Content>
                              Name : {item.name}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='configure' />
                            <Header.Content>
                              Condition : {item.condition}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='money' />
                            <Header.Content>
                              Price : {item.price + " $"}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='object ungroup' />
                            <Header.Content>
                              Category : {item.category}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='user' />
                            <Header.Content>
                              Owner : {item.owner}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='compass' />
                            <Header.Content>
                              Location : {item.location}
                            </Header.Content>
                          </Header>
                        </Grid.Column>
                        <Divider />
                        <Grid.Column width={2} color='brown'>
                          <Header as={'h4'}>
                            <Icon name='spinner' />
                            <Header.Content>
                              Status : {item.status}
                            </Header.Content>
                          </Header>
                          <Divider />
                          <ButtonsDisplayed checkuser={item.owner} stat={item.status} gotologin={this.redirectlogin.bind(this)} direct={this.HandleClickBorrow.bind(this)} gotoedit={this.redirectedit.bind(this)} />
                        </Grid.Column>
                      </Grid.Row>

                    </Grid.Column>


                  </Grid.Row>
                  <Grid.Row>
                    <Header as={'h4'}> Description <Divider /> {item.description} </Header>
                  </Grid.Row>


                </Grid>
                : <NotFoundPage />}


            </Grid.Column >
            <Grid.Column width={3}>
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
      sender: Session.get('user').username,
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
