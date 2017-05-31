import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Grid, Modal, Icon, Divider, Image, Header, Button } from 'semantic-ui-react'

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

    items = ItemCollection.find({ name: this.state.searchterm}, { sort: { name: 1 } }).fetch();


    return items.map((item) => (
      <Item key={item._id} item={item} />
    ));
  }


  render() {
    let searchterm = this.searchterm;
    return (

      <div>
        
        <Grid>
        
        <Grid.Row>
        
        <Grid.Column width={5}>
        </Grid.Column>

        <Grid.Column width={6}>
        <Input size='large' fluid icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm.bind(this)} />
        </Grid.Column>

        <Divider vertical/>
        <Grid.Column width={2}>
          <Modal trigger={<Button fluid size='large' color='black' inverted > Search </Button>}>
          <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
          <Modal.Content>
            {this.renderResults()}
          </Modal.Content>
        </Modal>
        </Grid.Column>

        <Grid.Column width={3}>
        </Grid.Column>

        </Grid.Row>

        </Grid>


      </div>
    );

  }
}
