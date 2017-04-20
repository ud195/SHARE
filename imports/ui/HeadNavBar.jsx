import React, {Component, PropTypes, Props} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { browserHistory  } from 'react-router'
import { Icon, Menu, Segment, Grid } from 'semantic-ui-react'

class HeadNavBar extends React.Component {

 constructor() {
    super();
    this.RedirectHome = this.RedirectHome.bind(this);
    this.RedirectLogin = this.RedirectLogin.bind(this);
    this.RedirectRegister = this.RedirectRegister.bind(this);
    this.RedirectUploaditem = this.RedirectUploaditem.bind(this);
    this.RedirectManageitem = this.RedirectManageitem.bind(this);
    this.RedirectItemGrid = this.RedirectItemGrid.bind(this);    
    this.RedirectContactUs = this.RedirectContactUs.bind(this);    
  }

    RedirectHome(event,{name}) {
    event.preventDefault();
    this.props.history.push('/home');
    }

    RedirectLogin(event,{name}) {
    event.preventDefault();
    this.props.history.push('/login');
    }

    RedirectRegister(event,{name}) {
    event.preventDefault();
    this.props.history.push('/register');
    }

    RedirectUploaditem(event,{name}) {
    event.preventDefault();
    this.props.history.push('/uploaditem');
    }
  
    RedirectManageitem(event,{name}) {
    event.preventDefault();
    this.props.history.push('/manageitem');
    }
  
    RedirectItemGrid(event,{name}) {
    event.preventDefault();
    this.props.history.push('/itemgrid');
    }
  
    RedirectContactUs(event,{name}) {
    event.preventDefault();
    this.props.history.push('/contactus');
  }
  
   render() {
      return (
               <header>
                 <Menu size='huge' color={'green'} inverted widths={7}>
                  <Menu.Item name='Home'  onClick={this.RedirectHome}  >
                   <Icon name='home' />
                    Home
                  </Menu.Item>
                  <Menu.Item name='Login' onClick={this.RedirectLogin}>
                   <Icon name='sign in' />
                    Login
                  </Menu.Item>

                  <Menu.Item name='Register' onClick={this.RedirectRegister}>
                   <Icon name='users' />
                    Register
                  </Menu.Item>

                  <Menu.Item name='Contact Us' onClick={this.RedirectContactUs}>
                   <Icon name='mail outline' />
                    Contact Us
                  </Menu.Item>

                  <Menu.Item name='Upload Item' onClick={this.RedirectUploaditem}>
                    <Icon name='plus' />
                    Upload Item
                  </Menu.Item>
                  <Menu.Item name='Manage Items' onClick={this.RedirectManageitem}>
                    <Icon name='database' />
                    Manage Items
                  </Menu.Item>
                  <Menu.Item name='Item Grid' onClick={this.RedirectItemGrid}>
                    <Icon name='grid layout' />
                    Item Grid
                  </Menu.Item>
                 </Menu>
               </header>
      );
   }
}

export default HeadNavBar;

      
      
      
      
      
      
      
      
