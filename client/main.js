import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from '../imports/ui/HomePage.jsx';
import Login from '../imports/ui/LoginPage.jsx';
import Register from '../imports/ui/RegistrationPage.jsx';
import ItemPage from '../imports/ui/UploadAnItem.jsx';
import ItemManagementPage from '../imports/manage/ItemAPI.jsx';
import HeadnavBar from '../imports/ui/HeadNavBar.jsx';
import HomeItemGrid from '../imports/ui/HomeItemGrid.jsx';
import developers from '../imports/ui/Developers.jsx';
import ViewAllItems from '../imports/ui/ViewAllItems.jsx';
import FooterNavBar from '../imports/ui/FooterNavBar.jsx';
import Chat from '../imports/ui/Chat.jsx';
import ContactUs from '../imports/ui/ContactUs.jsx';
import Comment from '../imports/manage/MessageAPI.jsx';

Meteor.startup( () => {
  render(
 <Router>
   <div>
      <Route exact path="" component={HeadnavBar}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path ="/login" component={Login}/>
      <Route path = "/uploaditem" component={ItemPage}/>
      <Route path = "/manageitem" component={ItemManagementPage}/>
      <Route path = "/itemgrid" component={HomeItemGrid}/>
      <Route path = "/developers" component={developers}/>
      <Route path = "/viewall" component={ViewAllItems}/>
      <Route path = "/chat" component={Chat}/>
      <Route path = "/contactus" component={ContactUs}/>
      <Route path = "/comment" component={Comment}/>
      <Route exact path="" component={FooterNavBar}/>

      </div>
 </Router> , document.getElementById('render-home')
  );
});