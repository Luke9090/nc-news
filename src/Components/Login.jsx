import React, { PureComponent } from 'react';
import './login.css';
import * as api from '../utils/api';

class Login extends PureComponent {
  state = {
    usernameInput: '',
    error: false
  };

  handleSubmit = async event => {
    const {usernameInput} = this.state;
    event.preventDefault();
    const valid = await api.validateUsername(usernameInput);
    if (valid) {
      this.props.changeUser(usernameInput);
      this.setState({ usernameInput: '', error: false });
    } else this.setState({error: true}, () => {setTimeout(() => {this.setState({error: false})}, 3000)})
  };

  handleChange = event => {
    this.setState({ usernameInput: event.target.value });
  };

  render() {
    const { loc, changeUser, loggedInAs } = this.props;
    const {usernameInput, error} = this.state;
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
          <input type="text" value={usernameInput} id="usernameInput" onChange={this.handleChange} placeholder="e.g. weegembump" required />
        </label>
        {error ? <p className="loginError">Login Error: Incorrect username</p> : ''}
        <button type="submit">Sign in</button>
      </form>
    );
  }
}

export default Login;
