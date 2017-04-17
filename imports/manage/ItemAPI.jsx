import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from 'semantic-ui-react'

const colors = [
  'teal'
]
import { ItemCollection } from '../collections/items.js';

import Item from '../objects/item.jsx';

class ItemAPI extends React.Component {

      renderItemsList ()
      {
             return this.props.items.map((item) => (
             <Item key={item._id} item={item} />
      ));
      }

      render() {
            return (
            <div>
            <h1> This is the DB Items </h1>
            <ul>
            {this.renderItemsList()}
            </ul>
              <div>
                {colors.map(color => (
                  <Table color={color} key={color} inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Option</Table.HeaderCell>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>{this.renderItemsList()}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                ))}
              </div>
            </div>
            );
      }

}

ItemAPI.propTypes = {
  items: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    items: ItemCollection.find({}, { sort: { createdAt: -1 }}).fetch()
  };
}, ItemAPI);