import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Segment, Header, Icon, Grid } from 'semantic-ui-react';
import HomeSideMenu from '../ui/HomeSideMenu.jsx';
import HomeSearchBar from '../ui/HomeSearchBar.jsx';

function renderDonation()
{
  return
  (
    <div>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={3}>
          <Segment color='blue' fluid inverted>
            <Header as='h2' icon>
              <Icon name='heart' />
              Donate to charity
              <Header.Subheader>
                Please consider donating to charity, thank you.
              </Header.Subheader>
            </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
        </Grid.Column>
        </div>
  );
}

class HomePage extends React.Component {


   render() {
      return (

        <Grid columns = {3}>
          <Grid.Row color='green'>
          <Grid.Column width = {16}>
          <HomeSearchBar />
          </Grid.Column>
          </Grid.Row>
          <HomeSideMenu/>
          <renderDonation/>
        </Grid>
      );
   }
}

export default HomePage;
