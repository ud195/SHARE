import React, { Component, PropTypes } from 'react';
import { ItemCollection } from '../collections/items.js';
import { Modal, Table, Header, Message, Card, Input, Icon, Image, Button, Divider, Form, Segment, Select } from 'semantic-ui-react'
import ItemTable from '../objects/ItemTable.jsx';
import { Session } from 'meteor/session';

export default class BorrowForm extends Component {


renderItemsList() {

    return this.props.items.map((item) => (
      <ItemTable key={item._id} item={item} />));

}
  render() {
    return (


      <div>
        {this.renderItemsList.bind(this)}
      </div>

    );
  }
}
