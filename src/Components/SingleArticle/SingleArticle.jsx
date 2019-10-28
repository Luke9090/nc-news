import React from 'react';
import Article from './Article';
import Comments from './Comments';

function SingleArticle({ article_id }) {
  return (
    <section id="articleSection">
      <Article article_id={article_id} />
      <Comments article_id={article_id} />
    </section>
  );
}

export default SingleArticle;
