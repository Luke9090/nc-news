import React, { PureComponent } from 'react';
import { Router } from '@reach/router';
import UserCard from '../UserList/UserCard';
import ArticleList from '../ArticleList/ArticleList';
import CommentList from './CommentList';
import Loading from '../Loading';
import * as api from '../../utils/api';
import ErrorDisplay from '../ErrorDisplay';
import './UserPage.css';

class UserPage extends PureComponent {
  state = {
    user: {},
    isLoading: true,
    error: null
  };

  componentDidMount() {
    const { author } = this.props;
    api
      .fetchSingleUser(author)
      .then(user => {
        this.setState({ user, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    const { loggedInAs } = this.props;
    const { user, isLoading, error } = this.state;
    if (isLoading) return <Loading />;
    if (error) return <ErrorDisplay msg={error.msg} status={error.status} />;
    return (
      <>
        <h2>
          User details for <span className="username">/u/{user.username}</span>
        </h2>
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
