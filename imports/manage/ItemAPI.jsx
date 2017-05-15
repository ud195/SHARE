import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Header, Table, Icon, Button, Segment } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import ItemTable from '../objects/ItemTable.jsx';

class ItemAPI extends React.Component {
 

      renderItemsList ()
      {
            return this.props.items.map((item) => (
            <ItemTable key={item._id} item={item} />
      ));

      

      }

      render() {
            return (
            <div>
            <Segment raised>
                <Header as='h2'>
           <Icon name='database' />
            <Header.Content>
              Manage items on the network
            </Header.Content>
          </Header>
            </Segment>
            <Segment raised>
            <Table compact celled definition inverted color='blue'>
       
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Checked</Table.HeaderCell>
                <Table.HeaderCell>Item Name</Table.HeaderCell>
                <Table.HeaderCell>Item Price</Table.HeaderCell>
                <Table.HeaderCell>Item Owner</Table.HeaderCell>
                <Table.HeaderCell>Item Condition</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.renderItemsList()}
            </Table>
            </Segment>
            </div>
            );
      }

}

ItemAPI.propTypes = {
  items: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    items: ItemCollection.find({}, { sort: { Name: 1 }}).fetch()
  };
}, ItemAPI);