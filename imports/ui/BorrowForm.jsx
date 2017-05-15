import React, { Component, PropTypes } from 'react';
import { Grid, Message, Header } from 'semantic-ui-react';
import Item from '../objects/ItemCardFull.jsx';
import { ItemCollection } from '../collections/items.js';

export default class BorrowForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
                  };
    }

  render()
  {
    let {error} = this.state;
    let { item } = this.state; 
    console.log("Item (render) >>> " , this.props.params);
    return (
      <div>
      {item ?
       <div>
       <h1>{item.name}}</h1>
       <h1>{item.description}</h1>
       </div> 
      : <h1> err </h1>}
      </div>
    ); 
  }

   componentDidMount() {
        this.loadItems();
       // console.log("Item (didmount) >>> " , item);

    }

    loadItems() {
        let item = ItemCollection.findOne({ "_id": this.props.params.id });
        if (item) {
            this.setState({ item: item });
        } else {
            this.setState({ error: "Error>>>" });
        }
        console.log("items (load items)-->", item);
        //console.log("Name (load items) -->", item.name);
    }
}