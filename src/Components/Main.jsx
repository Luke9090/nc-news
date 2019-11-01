import React from 'react';
import { Router } from '@reach/router';
import UserList from './UserList/UserList';
import TopicList from './TopicList/TopicList';
import ArticleList from './ArticleList/ArticleList';
import Article from './SingleArticle/Article';
import ErrorDisplay from './ErrorDisplay';
import Login from './Login';

function Main({ loggedInAs, changeUser }) {
  return (
    <main>
      <Router>
        <Login path="/login" loc="mobile" loggedInAs={loggedInAs} changeUser={changeUser} />
        <ArticleList path="/" loggedInAs={loggedInAs} />
        <ArticleList path="/t/:topic" loggedInAs={loggedInAs} />
        <ArticleList path="/u/:author" loggedInAs={loggedInAs} />
        <TopicList path="/t" />
        <UserList path="/u" loggedInAs={loggedInAs} />
        <Article path="/a/:article_id" loggedInAs={loggedInAs} />
        <ErrorDisplay default />
      </Router>
    </main>
  );
}

export default Main;
