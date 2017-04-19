import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Input, Segment, Menu, Icon, Dropdown } from 'semantic-ui-react'

import { ItemCollection } from '../collections/items.js';


class HomeSideMenu extends React.Component {


      render() {
            return (
                      <Menu vertical>
          <Menu.Item href='//google.com' target='_blank'>Visit Google</Menu.Item>
          <Menu.Item link>Link via prop</Menu.Item>
          <Menu.Item >Javascript Link</Menu.Item>
        </Menu>
            );
      }
}

export default HomeSideMenu;