import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class HomePage extends React.Component {
   render() {
      return (
         
         <header>
         <div>
          That's the home page it's very ugly !!
          </div>
         <div>
         <button > Take me somewhere else </button>
         <li><Link to="/login">login</Link></li>
         </div>
         </header>
      );
   }
}

export default HomePage;
