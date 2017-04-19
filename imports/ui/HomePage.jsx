import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Segment, Rail } from 'semantic-ui-react';
import ItemGrid from '../ui/HomeItemGrid.jsx';
import HomeSideMenu from '../ui/HomeSideMenu.jsx';
import HomeSearchBar from '../ui/HomeSearchBar.jsx';

class HomePage extends React.Component {


   render() {
      return (
         <div>    
          <Segment.Group >
          <Segment inverted color ='blue' compact raised>
          <HomeSearchBar />
          </Segment>
          <Segment.Group horizontal>
          <Segment>
          <HomeSideMenu/>
          </Segment>
          <Segment>
          <ItemGrid/>          
          </Segment>
          </Segment.Group>
          </Segment.Group>
        </div>
      );
   }
}

export default HomePage;
