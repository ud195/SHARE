import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ItemCollection } from '../collections/items.js';

class ItemAPI extends React.Component {

   render() {
      return (
         <div>
            <h1> This is the DB Items </h1>
         <div><li>item 1 -></li></div>
         </div>
         );
   }

}

export default ItemAPI;