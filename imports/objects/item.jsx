import React, { Component, PropTypes } from 'react';
import { ItemCollection } from '../collections/items.js';


// Task component - represents a single todo item
export default class Item extends Component {


 toggleChecked() {
    // Set the checked property to the opposite of its current value
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
      <li className={itemClassName}>
        <button className="delete" onClick={this.removeItem.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={this.props.item.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 
        <span className="text">{this.props.item.Name}</span>
        <span className="text">{this.props.item.Price}</span>
        <span className="text">{this.props.item.Status}</span>
        <span className="text">{this.props.item.Owner}</span>
        </li>
    );
  }
}
 
Item.propTypes = {
  item: PropTypes.object.isRequired,
};