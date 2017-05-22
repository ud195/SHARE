import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Grid,Input, Search, Modal, Icon, Divider, Image, Header, Button, Container } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

const source = (ItemCollection.find( {} ,{sort: {name: 1 } }).fetch());

export default class extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        isLoading: false, results: [], value: ''
      }
  };

  updateStateSearchTerm(event) { this.setState({ searchterm: event.target.value }); }

 /* handleSubmit() {
    items = ItemCollection.find({Name: this.state.searchterm }, {sort: {Name: 1 } }).fetch();
        return this.props.items.map((item) => (
      <Item key={item._id} item={item} />
    ));

    console.log("Searchterm: " + this.state.searchterm);
  }*/

  resetComponent()
  {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleResultSelect(e, result) 
  {
    this.setState({ value: result.name });
  }


  handleSearchChange(e, value) 
  {

        this.setState({ isLoading : true});
        this.setState({ value});

              if (this.state.value.length < 1) 
              {
      return (this.resetComponent());}

  setTimeout(() => {


      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500);
  }

  render() {

    const { isLoading, value, results } = this.state


    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 8)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column>
      </Grid>  
    );

  }

    componentWillMount() {
    this.resetComponent();
  }
}



/*    <div>
              <Input size='large' icon={<Icon name='search' circular link />} placeholder='Search...' value={this.state.searchterm} onChange={this.updateStateSearchTerm} />
              <Modal trigger={<Button size='large' onClick={this.handleSubmit}> Search </Button>}>
                <Modal.Header>You searched for : {this.state.searchterm}</Modal.Header>
                <Modal.Content>
                  {this.renderResults()}
                </Modal.Content>
              </Modal>

            </div>*/





