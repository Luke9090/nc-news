import React, { PureComponent } from 'react';
import './App.css';
import Title from './Components/Title';
import Menu from './Components/Menu';
import Main from './Components/Main';
import Login from './Components/Login';
import { Router } from '@reach/router';
import Blank from './Components/Blank';
import ErrorDisplay from './Components/ErrorDisplay';
import * as api from './utils/api';

class App extends PureComponent {
  state = {
    loggedInAs: null,
    backendAvailable: true
  };

  componentDidMount() {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser || loggedInUser === null) {
      this.setState({ loggedInAs: loggedInUser });
    }
    api.checkBackend().catch(() => {
      this.setState({ backendAvailable: false });
    });
  }

  changeUser = newUsername => {
    localStorage.setItem('username', newUsername);
    this.setState({ loggedInAs: newUsername });
  };

  render() {
    const { backendAvailable } = this.state;
    return (
      <>
        <Title />
        <Router id="normalLogin">
          <Login path="/*" loggedInAs={this.state.loggedInAs} changeUser={this.changeUser} loc="normal" />
          <Blank path="/login" />
        </Router>
        <Menu />
        {backendAvailable ? (
          <Main loggedInAs={this.state.loggedInAs} changeUser={this.changeUser} />
        ) : (
          <ErrorDisplay status="500" msg="Backend API unreachable. Is Heroku down? Is your internet connection OK?" />
        )}
      </>
    );
  }
}

export default App;
