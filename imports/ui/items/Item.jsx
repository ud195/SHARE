import React, { Component } from 'react';
import { Modal, Popup, Divider, Accordion, Message, Grid, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import NotFoundPage from '../NotFoundPage.jsx';
import { ItemCollection } from '../../collections/items.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            open: false
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
        let id = this.props.item._id;
        console.log("state>>", this.state);
        console.log("props>>", this.props);
        console.log("id>>", id);
        //console.log("user>>", user);
        return (
            <div>
                <Grid.Column verticalAlign="middle">
                    <Popup
                        trigger={<a href={`#/items/${item._id}/edit`}>
                            <Icon inverted circular name='edit' color="green" />
                        </a>}
                        content="Edit Item"
                        basic
                    />

                </Grid.Column>
                <Grid.Column>
                    <Card centered>
                        <Popup
                            trigger={<Image src={item.imageUrl} size="medium" />}
                            content={item.name}
                            basic
                        />
                        <Card.Content>
                            <Card.Header>
                                {item.name}
                            </Card.Header>
                        </Card.Content>
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
                    </Card>
                </Grid.Column>
            </div>
        )
    }

    // componentDidMount() {
    //     this.loadItems();
    // }

    loadItems() {
        let items = ItemCollection.find({ "owner": this.props.user.username }).fetch();
        let itemsCount = ItemCollection.find({ "owner": this.props.user.username }).count();
        if (items) {
            this.setState({ items: items });
            this.setState({ itemsCount: itemsCount });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items-->", items);
    }

    renderItems(item) {
        return (
            <Accordion key={item._id} panels={panels} exclusive={false} fluid />
        );
    }
}
