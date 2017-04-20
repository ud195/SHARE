import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Segment, Rail, Grid } from 'semantic-ui-react';
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
          
            <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={4} >
                  <HomeSideMenu/>
              </Grid.Column>
              <Grid.Column width={12} floated='right'>
                  <ItemGrid/>          
              </Grid.Column>
            </Grid.Row>
            </Grid>

          </Segment.Group>
        </div>
      );
   }
}

export default HomePage;
