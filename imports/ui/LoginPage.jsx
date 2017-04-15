import React from 'react';
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from "bootstrap";

class LoginPage extends React.Component {
   render() {
      return (
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
      );
   }
}

export default LoginPage;