import React, { PureComponent } from 'react';
import './App.css';
import Title from './Components/Title';
import Menu from './Components/Menu';
import Main from './Components/Main';
import Login from './Components/Login';

class App extends PureComponent {
  state = {
    loggedInAs: 'JessJelly'
  };

  render() {
    return (
      <>
        <Title />
        <Login loggedInAs={this.state.loggedInAs} />
        <Menu />
        <Main loggedInAs={this.state.loggedInAs} />
      </>
    );
  }
}

export default App;
