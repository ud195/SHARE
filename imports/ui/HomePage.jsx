import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'

class HomePage extends React.Component {
   render() {
      return (
         
  <Card>
    <Image src='https://s-media-cache-ak0.pinimg.com/564x/5b/96/45/5b9645508e0145e4f0d4d634f3a72fed.jpg' />
    <Card.Content>
      <Card.Header>
        Matthew
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>

      );
   }
}

export default HomePage;
