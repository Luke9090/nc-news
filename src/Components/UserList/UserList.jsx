import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';
import UserCard from './UserCard';
import './UserList.css';

class UserList extends PureComponent {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
    api.fetchUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  }

  render() {
    const { users, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <h2>All users</h2>
        <p id="userCount">Showing {users.length} users</p>
        {users.map(user => (
          <UserCard user={user} key={user.username} />
        ))}
      </>
    );
  }
}

export default UserList;
