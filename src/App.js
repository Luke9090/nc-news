import React, { PureComponent } from 'react';
import './App.css';
import Title from './Components/Title';
import Menu from './Components/Menu';
import Main from './Components/Main';
import Login from './Components/Login';
import { Router } from '@reach/router';
import Blank from './Components/Blank';

class App extends PureComponent {
  state = {
    loggedInAs: null
  };

  componentDidMount() {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser || loggedInUser === null) {
      this.setState({ loggedInAs: loggedInUser });
    }
  }

  changeUser = newUsername => {
    localStorage.setItem('username', newUsername);
    this.setState({ loggedInAs: newUsername });
  };

  render() {
    return (
      <>
        <Title />
        <Router id="normalLogin">
          <Login path="/*" loggedInAs={this.state.loggedInAs} changeUser={this.changeUser} loc="normal" />
          <Blank path="/login" />
        </Router>
        <Menu />
        <Main loggedInAs={this.state.loggedInAs} changeUser={this.changeUser} />
      </>
    );
  }
}

export default App;
