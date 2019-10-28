import React from 'react';
import { Router } from '@reach/router';
import UserList from './UserList/UserList';
import TopicList from './TopicList/TopicList';
import ArticleList from './ArticleList/ArticleList';

function Main() {
  return (
    <main>
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/t/:topic" />
        <TopicList path="/t" />
        <UserList path="/u" />
        <ArticleList path="/u/:user" />
      </Router>
    </main>
  );
}

export default Main;
