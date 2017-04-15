import React from 'react';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from "bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class LoginPage extends React.Component {
   render() {
      return (
        <header>
         <div>
           <h1>Login Page !!</h1>
           <form>
             <input type="text" />
             </form>
             <ButtonToolbar>
              <Button bsStyle="primary">Default button</Button>
              <Button>Default button</Button>
            </ButtonToolbar>
         </div>
         <div>
         <li><Link to="/home">register</Link></li>
         </div>
         </header>
      );
   }
}

export default LoginPage;