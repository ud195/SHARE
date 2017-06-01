import React, { Component } from 'react';
import { Grid, Menu, Dimmer, Header, Form, Segment, Card, Icon, Image, Divider, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import { Header, Message, Grid, Card, Input, Icon, Image, Button, Divider, Form, Segment, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from './NotFoundPage.jsx';
import { ItemCollection } from '../collections/items.js';
import { TransactionsCollection } from '../collections/transactions.js';
import Comment from '../manage/MessageAPI.jsx';
import ReactCountdownClock from 'react-countdown-clock';

function ButtonsDisplayed(props) {
  const stat = props.stat;
  const direct = props.direct;
  const gotoedit = props.gotoedit;
  const checkuser = props.checkuser;
  const gotologin = props.gotologin;
  const showclock = props.showclock;

  if (Session.get('user') == null) {
    return (<Button icon='content' onClick={gotologin} content='Login to borrow'></Button>);
  }
  else if (checkuser == Session.get('user').username) {
    return (<Button icon='content' onClick={gotoedit} color='violet' content='Edit'></Button>);
  }
  else if (stat == 'Not-Available') {
    return (<Button onClick={showclock} icon='question' color='yellow' content='Availability'></Button>);
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
      itemName: '',
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

  HandleAvail() {
    this.LoadItem();
    this.setState({ active2: true });
  }

  handleHide() {
    this.setState({ active: false });
  }

  handleHide2() {
    this.setState({ active2: false });
  }

  render() {
    const { stat } = this.props;
    const { active, active2 } = this.state;
    let { item, error } = this.state;
    console.log("state>>", this.state);
    return (
      <Dimmer.Dimmable dimmed={active}>
        {item ?
          <Grid>

            <Grid.Row>

              <Grid.Column width={3}>
              </Grid.Column>

              <Grid.Column width={10}>
                <Header as={'h3'}>
                  <Icon name='registered' />
                  <Header.Content>
                   {item.name}
                  </Header.Content>
                </Header>
                <Divider />
              </Grid.Column>

              <Grid.Column width={3}>
              </Grid.Column>

            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column width={3}>
              </Grid.Column>
              <Grid.Column width={10}>
                <Grid divided='vertically'>
                  <Grid.Row columns={2}>

                    <Grid.Column width={8}>
                      <Image fluid src={item.imageUrl} />
                    </Grid.Column>

                    <Grid.Column width={8}>
                      <Grid.Row columns={5} color='violet'>
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
                          <ButtonsDisplayed checkuser={item.owner} stat={item.status}
                            gotologin={this.redirectlogin.bind(this)} showclock={this.HandleAvail.bind(this)}
                            direct={this.HandleClickBorrow.bind(this)} gotoedit={this.redirectedit.bind(this)} />
                        </Grid.Column>
                      </Grid.Row>

                    </Grid.Column>


                  </Grid.Row>
                  <Grid.Row>
                    <Header as={'h4'}> Description <Divider /> {item.description} </Header>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Comment />
                    </Grid.Column>
                  </Grid.Row>

                </Grid>


              </Grid.Column >
              <Grid.Column width={3}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          : <NotFoundPage />}

        <Dimmer active={active2} onClickOutside={this.handleHide2}>

          <Grid>
            <Grid.Row>

              <Grid.Column width={7}>
                <Grid.Row >
                  <Grid.Column width={16}>
                    <Header color='red' as='h1' > Available in </Header>
                  </Grid.Column>

                  <Grid.Row columns={2}>
                  </Grid.Row>
                  <Grid.Column width={6} >
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <ReactCountdownClock seconds={10000} color="#ffffff" alpha={4.0} size={400} />
                  </Grid.Column>
                </Grid.Row>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />

                <Grid.Row>
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Divider hidden />
                  <Grid.Column width={16}>
                    <Button icon='remove' size='huge' onClick={this.handleHide2.bind(this)} color='red' content="OK" />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>

              <Grid.Column width={9}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Dimmer>


        <Dimmer active={active} onClickOutside={this.handleHide}>

          <Grid>

            <Grid.Row>

              <Grid.Column width={3}>
              </Grid.Column>

              <Grid.Column width={10}>
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
              </Grid.Column>

              <Grid.Column width={3}>
              </Grid.Column>


            </Grid.Row>

          </Grid>

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
      this.setState({ itemId: item._id });
      this.setState({ itemName: item.name });
      this.setState({ receiver: item.owner });
    }
    console.log("items-->", item);
  }


  onBorrowalSubmit(e) {
    e.preventDefault();
    this.setState({ sender: Session.get('user').username });
    console.log("submited..", this.state);
    let request = {
      createdAt: new Date(),
      duration: this.state.duration, // length of transaction duration
      type: this.state.type, //pickup or delivery
      requeststatus: 'sent', // accepted/denied/received
      itemId: this.state.itemId, // item id 
      itemName: this.state.itemName, // item id 
      price: this.state.price,
      priority: this.state.priority,
      error: this.state.error,
      receiver: this.state.receiver, // receiver 
      sender: Session.get('user').username
    }

    TransactionsCollection.insert(
      {
        receiver: request.receiver, sender: request.sender, itemId: request.itemId, itemname: request.itemName,
        createdAt: request.createdAt, priority: request.priority, price: request.price,
        duration: request.duration, type: request.type, requeststatus: request.requeststatus
      }
    );
    this.handleHide();
  }
}
