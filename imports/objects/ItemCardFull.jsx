import React, { Component } from 'react';
import { Divider, Dimmer, Accordion, Form, TextArea, Message, Reveal, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { ItemCollection } from '../collections/items.js';
import { TransactionsCollection } from '../collections/transactions.js';
import { Session } from 'meteor/session';
import ReactCountdownClock from 'react-countdown-clock';

function StatusColor(props) {
  const stat = props.stat;
  const text = props.text;
    if (stat == 'Not-Available') {
    return <Label ribbon color='red'>{text}</Label>;
  }
  if (stat == 'Available') {
    return <Label ribbon color='green'>{text}</Label>;
  }

  return <Label ribbon color='yellow'>{text}</Label>
}

function ButtonsDisplayed(props) {
  const stat = props.stat;
  const direct = props.direct;
  const gotoedit = props.gotoedit;
  const checkuser = props.checkuser;
  const gotologin = props.gotologin;
  const showclock = props.showclock;

if(Session.get('user') == null)
{
  return (<Button icon='content' onClick={gotologin} content='Login to borrow'></Button>);
}
else if(checkuser == Session.get('user').username)
  {
    return (<Button icon='content' onClick={gotoedit}  color='violet' content='Edit'></Button>);
  }
  else if (stat == 'Not-Available') {
    return (<Button onClick={showclock}  icon='question'  color='yellow' content='Availability'></Button>);
  }

    return (<Button onClick={direct}  icon='add to cart'  color='green' content='Borrow'></Button>);
}


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: null,
      duration: "", // length of transaction duration
      type: "", //pickup or delivery
      requeststatus: "", // accepted/denied/received
      itemId: "", // item id 
      itemName : '',
      sender: "",
      price: '',
      priority: '',
      receiver: null, // request sent to owner of the item 
      error: null
  };
  };


HandleClickBorrow()
{
  this.LoadItem();
  this.setState({active : true});
}


HandleClickView()
{

  this.LoadItem();
  //items/:id
  hashHistory.push(`/items/${this.props.item._id}`);
  console.log("ITIOTITJOI >>XX" ,this.props.item._id);

}

HandleClickAvailable()
{
    this.LoadItem();
    this.setState({active2 : true});
}

redirectlogin()
{
  hashHistory.push('login');
}

handleHide()
{
  this.setState({active : false});
}

handleHide2()
{
  this.setState({active2 : false});
}

redirectedit()
{
    this.LoadItem();
  //items/:id
  hashHistory.push(`/items/${this.props.item._id}/edit`);
}



  render() {
    const { active } = this.state;
    const {active2} = this.state;
    let { error } = this.state;
    let { item } = this.props;
    console.log("state>>", this.state);
    console.log("props>>", this.props);
    //console.log("user>>", user);
    return (

            <Card color='green'> 
            <Dimmer.Dimmable as={Card} dimmed={active}>

            <StatusColor stat={item.status} text={item.status} />
              <Image src={item.imageUrl} size='medium' />
              <Card.Content>
                <Card.Header>
                  {item.name}
                </Card.Header>
                <Divider />
                <span className='date'>
                  Condition : {item.condition}
                </span>
                <Divider />
                <span >
                  Price : {item.price}
                </span>
                <Divider />
                <span>
                  Location: {item.location} </span>
                <Divider />
                Owner : {item.owner}
              </Card.Content>

              <Card.Content extra>
                <Divider />
                <Button.Group fluid>
                <ButtonsDisplayed checkuser= {item.owner} showclock={this.HandleClickAvailable.bind(this)}
                 gotologin={this.redirectlogin.bind(this)} stat={item.status} 
                 direct={this.HandleClickBorrow.bind(this)} gotoedit={this.redirectedit.bind(this)}  />
                <Button.Or content='or'/>
                <Button icon='content' onClick={this.HandleClickView.bind(this)}  color='blue' content='View'></Button>
                </Button.Group>
              </Card.Content>

              <Dimmer active={active2} inverted onClickOutside={this.handleHide2}>
                
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={0}></Grid.Column>

                    <Grid.Column width={7}>
                      <Grid.Row>
                      <Grid.Column width={16}>  
                      <Header as='h3' > Available in </Header>
                      </Grid.Column>

                      <Grid.Row>
                      </Grid.Row>
                      <Grid.Column width={16}>
                      <ReactCountdownClock seconds={4*24*3600} color="#D35400" alpha={4.0} size={150}/>
                      </Grid.Column>
                      </Grid.Row>
                      <Divider hidden/>
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
                      <Grid.Column width={16}>  
                      <Button onClick={this.handleHide2.bind(this)} color='red' icon='cross'> OK </Button>
                      </Grid.Column>  
                      </Grid.Row>
                      </Grid.Column>

                      <Grid.Column width={9}></Grid.Column>
                  </Grid.Row>
                  </Grid>
              </Dimmer>       

                        
              
          <Dimmer active={active} onClickOutside={this.handleHide}>
            {item ?
              <div>
                <Form size='small'>
                  <Form.Field>
                    <Header as='h4' block>Duration of borrowal (days)</Header>
                    <Input type="text" placeholder="e.g. 4"
                      value={this.state.duration.trim()}
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
               </Dimmer.Dimmable></Card>


    )
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
    let item = ItemCollection.findOne({ "_id": this.props.item._id });
    if (item) {
      this.setState({ item: item });
      this.setState({ receiver: item.owner });
      this.setState({ sender : Session.get('user').username});
      this.setState({ itemId: item._id });
      this.setState({ itemName : item.name});
      console.log("Item Mount ::: >>", item);
      console.log("Sender", item.sender);
      console.log("receiver", item.receiver);
    }
    else {
      this.setState({ error: "Error>>>" });
    }
  }

  onBorrowalSubmit(e) {
    e.preventDefault();
 		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yy = date.getFullYear();
		var hh = date.getHours();
		var mn = date.getMinutes();

    console.log("submited..", this.state);
    let request = {
      createdAt : date,
      duration: this.state.duration, // length of transaction duration
      type: this.state.type, //pickup or delivery
      requeststatus: 'sent', // accepted/denied/received
      itemId: this.state.itemId, // item id 
      itemName: this.state.itemName, // item id 
      price: this.state.price,
      priority: this.state.priority,
      error: this.state.error,
      receiver: this.state.receiver, // receiver 
      ddaccepted: '',
      mmaccepted: '',
      yyaccepted: '',
      ddreturn: '',
      mmreturn: '',
      sender: Session.get('user').username
    }

    TransactionsCollection.insert(
      {
        receiver: request.receiver, sender: request.sender, itemId: request.itemId, itemname : request.itemName,
        createdAt: request.createdAt, priority: request.priority, price: request.price,
        duration: request.duration, type: request.type, requeststatus: request.requeststatus, ddaccepted : request.ddaccepted,
        mmaccepted : request.mmaccepted, yyaccepted : request.yyaccepted, ddreturn : request.ddreturn, mmreturn : request.mmreturn
      }
    );
    this.handleHide();
  }
}