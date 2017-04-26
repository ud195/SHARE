import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Modal, Icon, Divider, Image, Header, Button } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

export default class HomeSearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state =
      {
        searchterm: ''
      }
  };

  updateStateSearchTerm(event) { this.setState({ searchterm: event.target.value }); }



  renderResults() {
    let term = this.state.searchterm.trim();
    console.log("Searchterm: " + term);

    items = ItemCollection.find({ Name: this.state.searchterm }, { sort: { Name: 1 } }).fetch();


    return items.map((item) => (
      <Item key={item._id} item={item} />
    ));
  }


  render() {
    let searchterm = this.searchterm;
    return (

      <div>
        <Input fluid size='large' icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm.bind(this)} />
        <Modal trigger={<Button size='large' color='violet' fluid > Search </Button>}>
          <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
          <Modal.Content>
            {this.renderResults()}
          </Modal.Content>
        </Modal>
      </div>
    );

  }
}

