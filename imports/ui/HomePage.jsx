import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Segment, Rail, Grid, Divider } from 'semantic-ui-react';
import ItemGrid from '../ui/HomeItemGrid.jsx';
import HomeSideMenu from '../ui/HomeSideMenu.jsx';
import HomeSearchBar from '../ui/HomeSearchBar.jsx';

class HomePage extends React.Component {


  render() {
    return (
      <div>
        <Segment.Group >
          <Segment inverted color='blue' compact raised>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column width={4} >
                </Grid.Column>
                <Grid.Column width={8} >
                  <HomeSearchBar />
                </Grid.Column>
                <Grid.Column width={4} >
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={4} >

                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column width={2} >
                    </Grid.Column>
                    <Grid.Column width={12} >
                      <HomeSideMenu />
                    </Grid.Column>
                    <Grid.Column width={2} >
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Grid.Column>
              <Grid.Column width={12} floated='right'>
                <ItemGrid />
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Segment.Group>
      </div>
    );
  }
}

export default HomePage;
