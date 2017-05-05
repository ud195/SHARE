import React from 'react';
import { ItemCollection } from '../collections/items.js';
import { Modal, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment, Select } from 'semantic-ui-react'
import { Session } from 'meteor/session';

export default class UploadItemPage extends React.Component {

  constructor(props) {
    super(props);

    this.state =
      {
        ItemName: '',
        ItemDescription: '',
        ItemPrice : '',
        ItemOwner: Session.get('user').username,
        ItemCondition: '',
        ItemStatus: 'Unknown',
        IsBorrowed: false,
        ItemRating: 0,
        ItemCategory: 'Select an item category',
        ItemLocation: ''
      }
    handleSubmit = this.handleSubmit;
  };


  updateStateItemName(event) { this.setState({ ItemName: event.target.value }); }
  updateStateItemDescription(event) { this.setState({ ItemDescription: event.target.value }); }
  updateStateItemPrice(event) { this.setState({ ItemPrice: event.target.value }); }
  updateStateItemOwner(event) { this.setState({ ItemOwner: event.target.value }); }
  updateStateItemCondition(event) { this.setState({ ItemCondition: event.target.value }); }
  updateStateItemCategory(event) { this.setState({ ItemCategory: event.target.value }); }
  updateStateItemLocation(event) { this.setState({ ItemLocation: event.target.value }); }


  handleSubmit() {
    var Name = this.state.ItemName;
    var Description = this.state.ItemDescription;
    var Price = this.state.ItemPrice;
    var Owner = this.state.ItemOwner;
    var Condition = this.state.ItemCondition;
    var Status = this.state.ItemStatus;
    var Rating = this.state.ItemRating;
    var Borrowed = this.state.IsBorrowed;
    var Category = this.state.ItemCategory;
    var Location = this.state.ItemLocation;

    console.log("Name: " + this.state.ItemName);
    console.log("Description: " + this.state.ItemDescription);
    console.log("Price: " + this.state.ItemPrice);
    console.log("Owner: " + this.state.ItemOwner);
    console.log("Condition: " + this.state.Condition);
    console.log("Status:" + this.state.status);
    console.log("IsBorrowed:" + this.state.IsBorrowed);
    console.log("Rating:" + this.state.ItemRating);
    console.log("Category:" + this.state.ItemCategory);
    console.log("Location:" + this.state.ItemLocation);


    ItemCollection.insert({ Name, Description, Price, Owner, Condition, Status, Borrowed, Rating, Category, Location });
    this.state.ItemName = '';
    this.updateStateItemName.bind(this);
  }

  render() {
    return (
      <div>

        <Segment.Group>

          <Segment inverted color='blue'>
            <Header as='h2'>
              <Icon name='send outline' />
              <Header.Content>
                Upload your item to the network
            </Header.Content>
            </Header>
          </Segment>

          <Segment.Group horizontal>
            <Segment compact inverted color='green' raised>
              <Form inverted size='small'>
                <Form.Field>
                  <label>Item Name</label>
                  <Input placeholder='Enter Item Name' icon="registered" type="text" value={this.state.ItemName} onChange={this.updateStateItemName.bind(this)} />
                </Form.Field>

                <Form.Field>
                  <label>Item Description</label>
                  <Input placeholder='Enter Item Description' icon="browser" type="text" value={this.state.ItemDescription} onChange={this.updateStateItemDescription.bind(this)} />
                </Form.Field>

                <Form.Field>
                  <label>Item Price</label>
                  <select placeholder='Select Item Price' value={this.state.ItemPrice} onChange={this.updateStateItemPrice.bind(this)} >
                    <option value='0'>Free</option>
                    <option value='1'>1 $</option>
                  </select>
                </Form.Field>

                <Form.Field>
                  <label>Item Location</label>
                  <Input icon="compass" placeholder='Enter Item Location' type="text" value={this.state.ItemLocation} onChange={this.updateStateItemLocation.bind(this)} />
                </Form.Field>

                <Form.Field>
                  <label>Item Condition</label>
                  <select value={this.state.ItemCondition} onChange={this.updateStateItemCondition.bind(this)}>
                    <option value='new'>New</option>
                    <option value='used'>Used</option>
                    <option value='working'>Working</option>
                    <option value='partly-working'>Partly Working</option>
                  </select>
                </Form.Field>
                <Form.Field>
                  <label>Item Category</label>
                  <select value={this.state.ItemCategory} onChange={this.updateStateItemCategory.bind(this)} >
                    <option value='Un-Categorised'>Un-Categorised</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Appliances'>Appliances</option>
                    <option value='Gardening'>Gardening</option>
                    <option value='Furnitures'>Furnitures</option>
                    <option value='Motors'>Motors</option>
                  </select>
                </Form.Field>
              </Form>
              <Divider hidden />
              <Modal size='small' dimmer='inverted' color='blue' trigger={
                <Button size='large' icon='send' color='blue' content='Submit'
                  onClick={this.handleSubmit.bind(this)} />
               }>
                <Modal.Header>
                  <Header as='h2' icon>
                    <Icon name='send' />
                    Upload an item
              <Header.Subheader>
                      Your item has been uploaded.
              </Header.Subheader>
                  </Header>
                </Modal.Header>
              </Modal>

            </Segment>

            <Segment basic compact floated='right' >
              <header as='h2'>
                <Header.Content>
                  Preview
              <Divider />
                </Header.Content>
              </header>
              <Card>
                <Image src='https://s-media-cache-ak0.pinimg.com/736x/54/7a/9c/547a9cc6b93e10261f1dd8a8af474e03.jpg' />
                <Card.Content>
                  <Card.Header>
                    {this.state.ItemName}
                  </Card.Header>
                  <Card.Description>{this.state.ItemDescription}</Card.Description>
                  <Divider />

                  <span className='date'>
                    Condition : {this.state.ItemCondition}
                  </span>
                  <Divider />
                  <span >
                    Price : {this.state.ItemPrice}
                  </span>
                  <Divider />
                  <span>
                    Owner : {this.state.ItemOwner}
                  </span>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button icon='add to cart' basic color='green' content='Borrow'></Button>
                    <Button icon='talk outline' basic color='blue' content='Message  Owner'></Button>
                  </div>
                </Card.Content>
              </Card>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </div>

    );
  }
}

