import React, { PureComponent } from 'react';

class Login extends PureComponent {
  state = {
    usernameInput: '',
    loggedInAs: this.props.loggedInAs
  };

  render() {
    const { loc } = this.props;
    const loginId = `${loc}Login`;
    return (
      <div id={loginId}>
        <h3>Login</h3>
        <p>Login not yet implemented</p>
        <p>Logged in as {this.state.loggedInAs}</p>
      </div>
    );
  }
}

export default Login;
