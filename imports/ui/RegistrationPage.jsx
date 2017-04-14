import React from 'react';


class RegistrationPage extends React.Component {


  constructor(props) 
  {
    super(props);

    this.state = 
    {
      username: 'set your username',
      password: 'Set your password'
    }
    this.updateState = this.updateState.bind(this);
    this.updateStatePassword = this.updateStatePassword.bind(this);
  };

   updateState(e) 
   {
      this.setState(
        {
          username: e.target.value        
        }
        );
   }
 
   updateStatePassword(e) 
   {
      this.setState(
        {
          password: e.target.value
        }
        );
   }

   render() {
      return (
         <div>
           <h1>Registration Page !!</h1>
         <div>
           UserName >
            <input type = "text" value = {this.state.username} 
               onChange = {this.updateState} />
            <h4>{this.state.username}</h4>
         </div>
         <div>
           Password >
            <input type = "text" value = {this.state.password} 
               onChange = {this.updateStatePassword} />
         </div>
         </div>
         );
        }
}

export default RegistrationPage;