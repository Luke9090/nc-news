import React from 'react';
import { Router } from '@reach/router';
import UserList from './UserList/UserList';
import TopicList from './TopicList/TopicList';
import ArticleList from './ArticleList/ArticleList';
import SingleArticle from './SingleArticle/SingleArticle';

function Main({ loggedInAs }) {
  return (
    <main>
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/t/:topic" />
        <ArticleList path="/u/:user" />
        <TopicList path="/t" />
        <UserList path="/u" />
        <SingleArticle path="/a/:article_id" />
      </Router>
    </main>
  );
}

export default Main;
