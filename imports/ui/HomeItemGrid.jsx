import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Icon, Header, Table, CardGroup, Segment, Grid } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

class ItemGrid extends React.Component {

  renderItemsList() {
    return this.props.items.map((item) => (
      <Item key={item._id} item={item} />
    ));

  }

  render() {
    return (
      <div>
        <Segment >
          <Header as='h2'>
            <Icon name='star' />
            <Header.Content>
              Featured Items
            </Header.Content>
          </Header>
          <Grid columns={3}>
                  <Grid.Column width={1} />
                        <Grid.Column width={14} >
          <CardGroup >
            {this.renderItemsList()}
          </CardGroup>
                </Grid.Column>

                <Grid.Column width={1}/>

          </Grid>
        </Segment>
      </div>
    );
  }

}

export default createContainer(() => {
  return {
    items: ItemCollection.find({}, { sort: { Name: 1 }, limit: 6 }).fetch()
  };
}, ItemGrid);