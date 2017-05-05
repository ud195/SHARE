import React, { Component, PropTypes } from 'react';
import { ItemCollection } from '../collections/items.js';
import { Button, Card, Image, Segment, Divider, Label } from 'semantic-ui-react';
import { hashHistory, Link } from 'react-router';


function StatusColor(props) {
  const stat = props.stat;
  const text = props.text;
  if (stat == 'Available') {
    return <Label ribbon color='green'>{text}</Label>;
  }
  if(stat == 'Not-Available')
  {
    return <Label ribbon color='red'>{text}</Label>;
  }
    return <Label ribbon color='yellow'>{text}</Label>
}


  function BorrowButton(props) {
      return (<Button fluid icon='add to cart' basic color='green' content='Borrow'></Button>);
  }
  function ViewButton(props) {
      return (<Button icon='content' basic color='blue' content='View'></Button>);
  }
  function CheckAvailButton(props) {
      return (<Button fluid icon='content' basic color='yellow' content='Check Availability'></Button>);
  }


function ButtonsDisplayed(props) {
  const stat = props.stat;
  if (stat == 'Available') {
    return  <BorrowButton/>;
  }
  if(stat == 'Not-Available')
  {
   return  <CheckAvailButton/>;
  }
  else
  {
    return <BorrowButton/>
  }
}


export default class ItemCard extends Component {

  UpdateTag() {
    console.log("Status > " + this.props.item.Status);
  }


  render() {
    console.log("new data > "+this.props);
    return (
      <Card>
        <span>
        <StatusColor  stat = {this.props.item.Status} text={this.props.item.Status} />
              {this.UpdateTag()}

        </span>
        <Image src='https://s-media-cache-ak0.pinimg.com/736x/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg' />
        <Card.Content>
          <Card.Header>
            <Link to='borrow'> <span/>
            {this.props.item.Name}
            </Link>
          </Card.Header>
          <Card.Description>{this.props.item.Description}</Card.Description>
          <span className='date'>
            Condition : {this.props.item.Condition}
          </span>
          <Divider />
          <span >
            Price : {this.props.item.Price}
          </span>
          <Divider />
          <span> 
            Location: {this.props.item.Location} </span>
          <Divider />
            Owner : {this.props.item.Owner}
        </Card.Content>
        <Card.Content extra>
          <div>
        <Button fluid icon='content' basic color='blue' content='View'></Button>
        <Divider/>
        <ButtonsDisplayed  stat = {this.props.item.Status} />
        </div>
        </Card.Content>
      </Card>
    );
  }
}
