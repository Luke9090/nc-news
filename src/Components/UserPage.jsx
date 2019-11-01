import React, { PureComponent } from 'react';
import { Router } from '@reach/router';
import UserCard from './UserList/UserCard';
import ArticleList from './ArticleList/ArticleList';
import CommentList from './CommentList';
import Loading from './Loading';
import * as api from '../utils/api';

class UserPage extends PureComponent {
  state = {
    user: {},
    isLoading: true
  };

  componentDidMount() {
    const { author } = this.props;
    api.fetchSingleUser(author).then(user => {
      this.setState({ user, isLoading: false });
    });
  }

  render() {
    const { loggedInAs } = this.props;
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <UserCard loggedInAs={loggedInAs} user={user} />
        <Router>
          <ArticleList path="/" loggedInAs={loggedInAs} />
          <ArticleList path="/articles" loggedInAs={loggedInAs} />
          <CommentList path="/comments" loggedInAs={loggedInAs} />
        </Router>
      </>
    );
  }
}

export default UserPage;
