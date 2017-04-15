import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, FieldGroup, Button } from "react-bootstrap";

class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);

    this.state =
      {
        user: null,
      }
  };

  render() {
       console.log(this.state);
    let { user } = this.state;
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalFirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
              </Col>
          <Col sm={6}>
            <FormControl type="text" value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
              </Col>
          <Col sm={6}>
            <FormControl type="text" value={this.state.firstName} onChange={this.onLastNameChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
              </Col>
          <Col sm={6}>
            <FormControl type="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalUsername">
          <Col componentClass={ControlLabel} sm={2}>
            Username
              </Col>
          <Col sm={6}>
            <FormControl type="text" value={this.state.email} onChange={this.onUsernameChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
              </Col>
          <Col sm={6}>
            <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={6}>
            <Button bsStyle="primary" type="submit">
              Sign On
              </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  onFirstNameChange(e) {
    let firstName = e.target.value;
    this.setState({ firstName: firstName });
    let user = Object.assign({}, user, { firstName });
    this.setState({ user });
  }

  onLastNameChange(e) {
    let lastName = e.target.value;
    this.setState({ lastName: lastName });
    let user = Object.assign({},user, { lastName });
    this.setState({ user });
  }

  onEmailChange(e) {
    let email = e.target.value;
    this.setState({ email: email });
    let user = Object.assign({},user, { email });
    this.setState({ user });
  }

  onUsernameChange(e) {
    let username = e.target.value;
    this.setState({ username: username });
    let user = Object.assign({}, user, { username });
    this.setState({ user });
  }

  onPasswordChange(e) {
    let password = e.target.value;
    this.setState({ password: password });
    let user = Object.assign({}, user, { password });
    this.setState({ user });
  }

  onsubmit(e) {
    
  }

}

export default RegistrationPage;