import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class HeadNavBar extends React.Component {
   render() {
      return (
         
       <header>
       <ul>
       <li><Link to="/home">Home</Link></li>
       <li><Link to="/register">Register</Link></li>
       <li><Link to="/login">Login</Link></li>
       <li><Link to="/uploaditem">Item upload</Link></li>
       <li><Link to="/manageitem">Item Management</Link></li>
       </ul>
       </header>
      );
   }
}

export default HeadNavBar;

      
      
      
      
      
      
      
      
