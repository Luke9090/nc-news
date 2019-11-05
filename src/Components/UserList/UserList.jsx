import React, { PureComponent } from 'react';
import Loading from '../Loading';
import * as api from '../../utils/api';
import UserCard from './UserCard';
import './UserList.css';

class UserList extends PureComponent {
  state = {
    users: [],
    isLoading: true,
    sort_by: 'username',
    order: 'asc'
  };

  componentDidMount() {
    this.grabUsers();
  }

  grabUsers() {
    const { sort_by, order } = this.state;
    api.fetchUsers(sort_by, order).then(users => {
      this.setState({ users, isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value, isLoading: true }, this.grabUsers);
  };

  render() {
    const { users, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <h2>All users</h2>
        <form id="sortControls">
          <label htmlFor="sort_by" id="sortLabel">
            Sort by...
            <select id="sort_by" value={this.state.sort_by} onChange={this.handleChange}>
              <option value="username">Username (default)</option>
              <option value="article_count">No. of articles</option>
              <option value="article_votes">Article votes</option>
              <option value="comment_count">No. of comments</option>
              <option value="comment_votes">Comment votes</option>
              <option value="total_votes">Total votes</option>
            </select>
          </label>
          <label htmlFor="order" id="orderLabel">
            Order...
            <select id="order" value={this.state.order} onChange={this.handleChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending (default)</option>
            </select>
          </label>
        </form>
        <p id="userCount">Showing {users.length} users</p>
        {users.map(user => (
          <UserCard user={user} key={user.username} />
        ))}
      </>
    );
  }
}

export default UserList;
