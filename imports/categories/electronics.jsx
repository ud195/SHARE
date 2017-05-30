import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Icon, Divider, Header, Table, CardGroup, Segment } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

//import Item from '../objects/ItemCardFull.jsx';
import ItemCard from '../ui/items/Featured.jsx';

class ElectronicsClass extends React.Component {

  renderItemsList() {
    return this.props.items.map((item) => (
      <ItemCard key={item._id} item={item} />
    ));

  }

  render() {
    return (
      <div>
        <Header as='h2' color='blue'>
            <Icon color='blue' name='desktop' />
          <Header.Content>
            Featured Electronics
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
    items: ItemCollection.find({ category: 'Electronics' }, { sort: { Name: 1 }, limit: 6 }).fetch()
  };
}, ElectronicsClass);