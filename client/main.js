import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from '../imports/ui/HomePage.jsx';
import Login from '../imports/ui/LoginPage.jsx';
import Register from '../imports/ui/RegistrationPage.jsx';
import ItemPage from '../imports/ui/UploadAnItem.jsx';

Meteor.startup( () => {
  render(
 <Router>
   <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path ="/login" component={Login}/>
      <Route path = "/uploaditem" component={ItemPage}/>
      </div>
 </Router> , document.getElementById('render-home')
  );
});