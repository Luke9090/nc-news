import React from 'react';
import { Router } from '@reach/router';
import UserList from './UserList/UserList';
import TopicList from './TopicList/TopicList';
import ArticleList from './ArticleList/ArticleList';

function Main({ loggedInAs }) {
  return (
    <main>
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/t/:topic" />
        <ArticleList path="/u/:user" />
        <TopicList path="/t" />
        <UserList path="/u" />
      </Router>
    </main>
  );
}

export default Main;
