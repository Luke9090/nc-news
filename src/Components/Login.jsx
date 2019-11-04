import React, { PureComponent } from 'react';
import './login.css';

class Login extends PureComponent {
  state = {
    usernameInput: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.changeUser(this.state.usernameInput);
    this.setState({ usernameInput: '' });
  };

  handleChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  render() {
    const { loc, changeUser, loggedInAs } = this.props;
    const loginId = `${loc}Login`;
    if (loggedInAs)
      return (
        <form id={loginId} className="login">
          <h3>Login</h3>
          <p>
            Logged in as <span className="username">/u/{loggedInAs}</span>
          </p>
          <button onClick={() => changeUser(null)}>Sign out</button>
        </form>
      );
    return (
      <form onSubmit={this.handleSubmit} id={loginId} className="login">
        <h3>Login</h3>
        <label htmlFor="usernameInput">
          Username:{' '}
          <input type="text" value={this.state.usernameInput} id="usernameInput" onChange={this.handleChange} placeholder="e.g. weegembump" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    );
  }
}

export default Login;
