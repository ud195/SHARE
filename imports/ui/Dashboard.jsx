import React, { Component } from 'react';
import { Grid, Divider, Menu, Segment, Header, Card, Icon, Image, Input, Button, List, Item, ItemContent } from 'semantic-ui-react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import User from './user/User.jsx';
import ItemsList from './items/List.jsx'; 
import TransacAPI  from './user/TransacAPI.jsx';  
import { Session } from 'meteor/session';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            activeItem: 'Profile'
        };
    };

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        let { user, error, activeItem } = this.state;
        console.log("state>>", this.state);
        return (
            <div>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick.bind(this)} >
                            </Menu.Item>
                            <Menu.Item name='Items' active={activeItem === 'Items'} onClick={this.handleItemClick.bind(this)} />
                            <Menu.Item name='Requests' active={activeItem === 'Requests'} onClick={this.handleItemClick.bind(this)} />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
                            <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Header as='h3' color='violet'> <Icon color='violet' name='dashboard'/> Dashboard </Header>
                            <Divider hidden/>
                            </Grid.Column> 
                            <Grid.Column width={8}>
                            <Header floated='left' as='h3'> <a href={`#/items/new`}><Icon name='plus' />Add item</a></Header>
                            </Grid.Column>
                            </Grid.Row>
                            </Grid>
                            {(activeItem == 'Profile') ? <User user={user} /> : <p></p>}
                            {(activeItem == 'Items') ? <ItemsList user={user} /> : <p></p>}
                            {(activeItem == 'Requests') ? <TransacAPI user = {user}/> :<p></p>}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        console.log("props", this.props);
        let user = Meteor.users.findOne({ username: this.props.params.username });
        if (user) {
            this.setState({ user: user });
        } else {
            this.setState({ error: "Error>>>" });
        }
    }
}
