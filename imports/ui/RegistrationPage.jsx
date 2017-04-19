import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, FieldGroup, Alert } from "semantic-ui-react";


export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state =
      {
        error: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      }
  };

  render() {
    let { firstName, lastName, email, username, password, error } = this.state;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
          </Modal.Header>

          <Modal.Body>
            {error.length > 0 ?
              <h3>{error}</h3>
              : ''}
            <Form  onSubmit={this.onSubmit.bind(this)}>
              <FormGroup controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} >
                  First Name
              </Col>
                <Col>
                  <FormControl type="text" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLastName">
                <Col componentClass={ControlLabel}>
                  Last Name
              </Col>
                <Col>
                  <FormControl type="text" value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel}>
                  Email
              </Col>
                <Col>
                  <FormControl type="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel}>
                  Username
              </Col>
                <Col>
                  <FormControl type="text" value={this.state.username} onChange={this.onUsernameChange.bind(this)} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel}>
                  Password
              </Col>
                <Col>
                  <FormControl type="password" value={this.state.Password} onChange={this.onPasswordChange.bind(this)} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col>
                  <Button bsStyle="primary" type="submit" >Sign On</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }


  onFirstNameChange(e) {
    let firstName = e.target.value;
    this.setState({ firstName: firstName });
  }

  onLastNameChange(e) {
    let lastName = e.target.value;
    this.setState({ lastName: lastName });
  }

  onEmailChange(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  onUsernameChange(e) {
    let username = e.target.value;
    this.setState({ username: username });
  }

  onPasswordChange(e) {
    let password = e.target.value;
    this.setState({ password: password });
  }

  onSubmit(e) {
    e.preventDefault();
  
    Accounts.createUser({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      profile: {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
    }, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
         
      }
    });

  }
}
