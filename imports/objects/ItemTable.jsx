import React, { Component, PropTypes } from 'react';
import { ItemCollection } from '../collections/items.js';
import { Input, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

export default class ItemTable extends Component {


 toggleChecked() {
    ItemCollection.update(this.props.item._id, {
      $set: { checked: !this.props.item.checked },
    });
  }
 
 
  
      removeItem() {
        ItemCollection.remove(this.props.item._id);
      }

  render() {
      const itemClassName = this.props.item.checked ? 'checked' : '';

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>    
            <Button color='green' icon labelPosition='left' size='small' onClick={this.removeItem.bind(this)}>
              <Icon name='remove circle outline' /> Remove Item
            </Button>
          </Table.Cell>
          <Table.Cell collapsing>
          <input type='Checkbox'  readOnly checked={this.props.item.checked} onClick={this.toggleChecked.bind(this)}/>

          </Table.Cell>
          <Table.Cell>{this.props.item.Name}</Table.Cell>
          <Table.Cell>{this.props.item.Price}</Table.Cell>
          <Table.Cell>{this.props.item.Owner}</Table.Cell>
          <Table.Cell>{this.props.item.Condition}</Table.Cell>
        </Table.Row>
      </Table.Body>
      );
    }
  }
  
ItemTable.propTypes = {
  item: PropTypes.object.isRequired,
};