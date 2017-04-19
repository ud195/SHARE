import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Icon, Header, Table, CardGroup, Segment } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

class ItemGrid extends React.Component {

      renderItemsList ()
      {
            return this.props.items.map((item) => (
            <Item key={item._id} item={item} />
      ));

      }

      render() {
            return (
            <div>
            <Segment compact inverted >
                  <Header as='h2'>
           <Icon name='star' />
            <Header.Content>
              Featured Items
            </Header.Content>
          </Header>
            <CardGroup compact color='blue'>
            {this.renderItemsList()}
            </CardGroup>
            </Segment>
            </div>
            );
      }

}

export default createContainer(() => {
  return {
    items: ItemCollection.find({}, { sort: { Name: 1 }, limit: 8 }).fetch()
  };
}, ItemGrid);