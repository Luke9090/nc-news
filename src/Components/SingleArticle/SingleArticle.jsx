import React from 'react';
import Article from './Article';
import './singleArticle.css';

function SingleArticle({ article_id, loggedInAs }) {
  return (
    <section id="articleSection">
      <Article article_id={article_id} loggedInAs={loggedInAs} />
    </section>
  );
}

export default SingleArticle;
