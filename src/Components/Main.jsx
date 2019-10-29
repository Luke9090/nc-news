import React from 'react';
import { Router } from '@reach/router';
import UserList from './UserList/UserList';
import TopicList from './TopicList/TopicList';
import ArticleList from './ArticleList/ArticleList';
import SingleArticle from './SingleArticle/SingleArticle';
import ErrorDisplay from './ErrorDisplay';

function Main({ loggedInAs }) {
  return (
    <main>
      <Router>
        <ArticleList path="/" loggedInAs={loggedInAs} />
        <ArticleList path="/t/:topic" loggedInAs={loggedInAs} />
        <ArticleList path="/u/:user" loggedInAs={loggedInAs} />
        <TopicList path="/t" />
        <UserList path="/u" loggedInAs={loggedInAs} />
        <SingleArticle path="/a/:article_id" loggedInAs={loggedInAs} />
        <ErrorDisplay default />
      </Router>
    </main>
  );
}

export default Main;
