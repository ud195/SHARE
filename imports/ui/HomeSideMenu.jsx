import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Grid, Label, Menu, Icon, Segment, Header } from 'semantic-ui-react'
import ItemGrid from '../ui/HomeItemGrid.jsx';
import ClothingClass from '../categories/clothing.jsx';
import ElectronicsClass from '../categories/electronics.jsx';
import AppliancesClass from '../categories/appliances.jsx';
import GardeningClass from '../categories/gardening.jsx';
import FurnituresClass from '../categories/furnitures.jsx';
import MotorsClass from '../categories/motors.jsx';
import OthersClass from '../categories/others.jsx';

import { ItemCollection } from '../collections/items.js';

class HomeSideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
  };

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (

      <Grid.Row >

        <Grid.Column width={1}>
        </Grid.Column>

        <Grid.Column width={4}>

          <Menu size='huge' vertical>
            <Menu.Header>
              <Header
                as='h4'
                image='http://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png'
                content='Categories'
              />
            </Menu.Header>

            <Menu.Item name='home' active={activeItem === 'home'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='green'>H</Label>
              Home
        </Menu.Item>

            <Menu.Item name='clothing' active={activeItem === 'clothing'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='red'>C</Label>
              Clothing
        </Menu.Item>

            <Menu.Item name='electronics' active={activeItem === 'electronics'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='blue'>E</Label>
              Electronics
        </Menu.Item>

            <Menu.Item name='appliances' active={activeItem === 'appliances'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='violet'>A</Label>
              Appliances
        </Menu.Item>

            <Menu.Item name='gardening' active={activeItem === 'gardening'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='teal'>G</Label>
              Gardening
        </Menu.Item>

            <Menu.Item name='furnitures' active={activeItem === 'furnitures '}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='brown'>F</Label>
              Furnitures
        </Menu.Item>

            <Menu.Item name='motors' active={activeItem === 'motors'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='orange'>M</Label>
              Motors
        </Menu.Item>

              <Menu.Item name='others' active={activeItem === 'others'}
              onClick={this.handleItemClick.bind(this)} >
              <Label color='olive'>O</Label>
              Others
        </Menu.Item>

          </Menu>
        </Grid.Column>

        <Grid.Column width={11}>
          {(activeItem == 'home') ? <ItemGrid /> : <p> </p>}
          {(activeItem == 'clothing') ? <ClothingClass /> : <p> </p>}
          {(activeItem == 'electronics') ? <ElectronicsClass /> : <p></p>}
          {(activeItem == 'appliances') ? <AppliancesClass /> : <p></p>}
          {(activeItem == 'gardening') ? <GardeningClass /> : <p></p>}
          {(activeItem == 'furnitures') ? <FurnituresClass /> : <p></p>}
          {(activeItem == 'motors') ? <MotorsClass /> : <p></p>}
          {(activeItem == 'others') ? <OthersClass /> : <p></p>}
        </Grid.Column>

      </Grid.Row>


    );
  }
}

export default HomeSideMenu;