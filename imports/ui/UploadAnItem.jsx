import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ItemCollection } from '../collections/items.js';

class UploadItemPage extends React.Component {

  constructor(props) 
  {
    super(props);

    this.state = 
    {
      ItemName: 'Chainsaw',
      ItemDescription: 'This is the original chainsaw from texas !!',
      ItemPrice : ' Free ',
      ItemOwner :'Leather face',
      ItemStatus : 'partlyworking'
    }

      this.updateStateItemName = this.updateStateItemName.bind(this);
      this.updateStateItemDescription = this.updateStateItemDescription.bind(this);
      this.updateStateItemPrice = this.updateStateItemPrice.bind(this);
      this.updateStateItemOwner = this.updateStateItemOwner.bind(this);
      this.updateStateItemStatus = this.updateStateItemStatus.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  };


   updateStateItemName(event)        {this.setState({ ItemName: event.target.value});}
   updateStateItemDescription(event) {this.setState({ItemDescription: event.target.value});}
   updateStateItemPrice(event)       {this.setState({ItemPrice : event.target.value});}
   updateStateItemOwner(event)       {this.setState({ItemOwner : event.target.value});}
   updateStateItemStatus(event)      {this.setState({ItemStatus: event.target.value});}


   handleSubmit() {
      
      var Name = this.state.ItemName;
      var Description = this.state.ItemDescription;
      var Price = this.state.ItemPrice;
      var Owner = this.state.ItemOwner;
      var Status = this.state.ItemStatus;
      date = new Date();
    console.log("Name: " + this.state.ItemName);
    console.log("Description: " + this.state.ItemDescription);
    console.log("Price: " + this.state.ItemPrice);
    console.log("Owner: " + this.state.ItemOwner);
    console.log("Status: " + this.state.ItemStatus);

    ItemCollection.insert({Name,Description,Price,Owner,Status,date});
    
}

   render() {
      return (
         <div>
           <h1>Upload An Item Page !!</h1>
         <div>
           Item Name >
            <input type = "text" value = {this.state.ItemName} 
               onChange = {this.updateStateItemName} />
            <h4>{this.state.ItemName}</h4>
         </div>
         <div>
           Item Description >
            <input type = "text" value = {this.state.ItemDescription} 
               onChange = {this.updateStateItemDescription} />
            <h4>{this.state.ItemDescription}</h4>
         </div>
         <div>
           Item Price >
            <input type = "text" value = {this.state.ItemPrice} 
               onChange = {this.updateStateItemPrice} />
            <h4>{this.state.ItemPrice}</h4>
         </div>
         <div>
           Item Owner >
            <input type = "text" value = {this.state.ItemOwner} 
               onChange = {this.updateStateItemOwner} />
            <h4>{this.state.ItemOwner}</h4>
         </div>         
         <div>
           Item Status >
            <select value = {this.state.ItemStatus} onChange= {this.updateStateItemStatus} >    
            <option value="good">New</option>
            <option value="used">Used</option>
            <option value="working">Working</option>
            <option value="partlyworking">Partly Working</option>
            </select>      
         </div>
         <div>
             <button onClick = {this.handleSubmit}>Submit |O|</button>
         </div>
         </div>
   
         );
        }
}

export default UploadItemPage;