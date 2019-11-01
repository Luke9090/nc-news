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
    console.dir(this.props.location);
    const { loggedInAs, author } = this.props;
    const { user, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <UserCard loggedInAs={loggedInAs} user={user} />
        <Router>
          <ArticleList path="/" loggedInAs={loggedInAs} author={author} />
          <ArticleList path="/articles" loggedInAs={loggedInAs} author={author} />
          <CommentList path="/comments" loggedInAs={loggedInAs} author={author} />
        </Router>
      </>
    );
  }
}

export default UserPage;
