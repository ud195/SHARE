import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Segment, Header, Icon, Grid } from 'semantic-ui-react';
import HomeSideMenu from '../ui/HomeSideMenu.jsx';
import HomeSearchBar from '../ui/HomeSearchBar.jsx';


class HomePage extends React.Component {


   render() {
      return (

        <Grid columns = {3}>
          <Grid.Row color='green'>
          <Grid.Column width = {16}>
          <HomeSearchBar />
          </Grid.Column>
               <Grid.Column width={1}>
          </Grid.Column>
          </Grid.Row>
          <HomeSideMenu/>
        </Grid>
      );
   }
}

export default HomePage;
