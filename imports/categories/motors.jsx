import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Icon, Divider, Header, Table, CardGroup, Segment } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import ItemCard from '../ui/items/Featured.jsx';

class MotorsClass extends React.Component {

  renderItemsList() {
    return this.props.items.map((item) => (
      <ItemCard key={item._id} item={item} />
    ));

  }

  render() {
    return (
      <div>
        <Header as='h2' color='orange'>
            <Icon color='orange' name='car' />
          <Header.Content>
            Featured Motors
            </Header.Content>
        </Header>
        <CardGroup >
          {this.renderItemsList()}
        </CardGroup>
      </div>
    );
  }

}


export default createContainer(() => {
  return {
    items: ItemCollection.find({ category: 'Motors' }, { sort: { Name: 1 }, limit: 6 }).fetch()
  };
}, MotorsClass);