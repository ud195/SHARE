import React, { Component } from 'react';
import { Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent, Label } from 'semantic-ui-react';
import { ItemCollection } from '../collections/items.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: Session.get('user').username,
            condition: this.state.condition,
            status : this.state.status,
            borrowed : this.state.borrowed,
            rating : this.state.rating,
            category : this.state.category,
            location : this.state.location,
            imageUrl: this.state.uploadedFileCloudinaryUrl,
            error: null
        };
    };

  UpdateAvailable()
  {
    ItemCollection.update(this.props.item._id, {
      $set: { status: 'Available' },
    });
  }

  UpdateNotAvailable()
  {
    ItemCollection.update(this.props.item._id, {
      $set: { status: 'Not-Available' },
    });
  }

  removeItem() {
    ItemCollection.remove(this.props.item._id);
  }
    render() {
        let { error } = this.state;
        let { item } = this.props;

        return (
            <div>
            {item ?
                <div>
                <span>{item.status}</span>
                <span><Image src={item.imageUrl} /></span>
                <span>{item.name}</span>
                <span>{item.description}</span>
                <span>{item.condition}</span>
                <span>{item.price}</span>
                <span>{item.location} </span>
                <span>{item.owner}</span>
                <a href={`/items/${item._id}/borrow`}><Icon name="edit" />{item.name}</a>
                <Button.Group vertical>
                  <Button color='red' icon labelPosition='left' size='small' onClick={this.removeItem.bind(this)}>
                   <Icon name='remove circle outline' /> Remove Item
                  </Button>
                  <Button color='green' icon labelPosition='left' size='small' onClick={this.UpdateAvailable.bind(this)}>
                   <Icon name='checkmark' /> Mark as available
                  </Button>
                  <Button color='yellow' icon labelPosition='left' size='small' onClick={this.UpdateNotAvailable.bind(this)}>
                   <Icon name='minus circle' /> Mark as un-available
                  </Button>
                 </Button.Group>
                </div> : <h1>error</h1> }
            </div>
        )
    }

     componentDidMount() {
       //this.loadItems();
    }

    loadItems() {
        let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (item) {
            this.setState({ item: item });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items (load items)-->", item);
    }
}