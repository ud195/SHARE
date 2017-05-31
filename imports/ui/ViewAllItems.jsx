import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Image, Icon, Table, Divider, Grid, CardGroup, Segment, Statistic } from 'semantic-ui-react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { ItemCollection } from '../collections/items.js';

import Item from '../objects/ItemCardFull.jsx';

class ItemViewAll extends React.Component {


    renderItemsList() {
        return this.props.items.map((item) => (
            <Item key={item._id} item={item} />
        ));

        //new Counter('Count', ItemCollection.find());

    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column width={5}>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment>
                            <Statistic.Group>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='database'/>
                                        {ItemCollection.find().count()}
                                    </Statistic.Value>
                                    <Statistic.Label>Items On The Network</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='dollar'/>
                                        {ItemCollection.find({ price: 0 }).count()}
                                    </Statistic.Value>
                                    <Statistic.Label>Items Are Free</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='wrench'/>
                                        {ItemCollection.find({ condition: 'new' }).count()}
                                    </Statistic.Value>
                                    <Statistic.Label>Items ARE NEW</Statistic.Label>
                                </Statistic>
                                <Statistic>
                                    <Statistic.Value>
                                        <Icon name='checkmark'/>
                                        {ItemCollection.find({ status: 'Available' }).count()}
                                    </Statistic.Value>
                                    <Statistic.Label>Items Available</Statistic.Label>
                                </Statistic>
                            </Statistic.Group>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column width={4}>
                        </Grid.Column>


                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <Grid.Column width={2}>
                        </Grid.Column>

                        <Grid.Column width={13}>
                            <CardGroup>
                                {this.renderItemsList()}
                            </CardGroup>
                        </Grid.Column>

                        <Grid.Column width={1}>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>
        );
    }

}

ItemViewAll.propTypes = {
    items: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        items: ItemCollection.find({}, { sort: { Name: 1 } }).fetch()
    };
}, ItemViewAll);