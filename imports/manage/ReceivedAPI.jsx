import React, { Component, PropTypes } from 'react';
import { Header, Table, Icon, Button, Segment } from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data';
import { TransactionsCollection } from '../collections/transactions';

import ItemTable from '../objects/ItemTable.jsx';

class BorrowalRequestsAPI extends React.Component {


  renderRequestsList() {

    return this.props.requests.map((request) => (
      <ItemTable key={request._id} request={request} />
    ));

  }

  render() {
    return (
      <div>
        <Segment raised>
          <Header as='h2'>
            <Icon name='database' />
            <Header.Content>
              Manage items on the network
            </Header.Content>
          </Header>
        </Segment>
        <Segment raised>
          <Table compact celled structured columns={9} inverted color='blue'>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Item Name</Table.HeaderCell>
                <Table.HeaderCell>Borrower's name</Table.HeaderCell>
                <Table.HeaderCell>Exchange Type</Table.HeaderCell>
                <Table.HeaderCell>Item Price</Table.HeaderCell>
                <Table.HeaderCell>Exchange time</Table.HeaderCell>
                <Table.HeaderCell>Item Availability</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.renderRequestsList()}
          </Table>
        </Segment>
      </div>
    );
  }

}

BorrowalRequestsAPI.propTypes = {
	borrowalrequests: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		borrowalrequests: TransactionsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
	};
}, BorrowalRequestsAPI);