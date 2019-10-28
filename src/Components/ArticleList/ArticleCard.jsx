import React from 'react';
import { Link } from '@reach/router';
import * as data from '../../utils/data';

function ArticleCard({ article }) {
  const { author, title, article_id, topic, created_at, votes, comment_count } = article;
  return (
    <section className="articleCard">
      <span className="articleVotes">{votes}</span>
      <Link to={`/a/${article_id}`}>
        <h3 className="articleTitle">{title}</h3>
      </Link>
      <p className="articleAuthor">
        <Link to={`/u/${author}`}>/u/{author}</Link>
      </p>
      <p className="articleTopic">
        <Link to={`/t/${topic}`}>/t/{topic}</Link>
      </p>
      <p className="articleTime">{data.formatTime(created_at)}</p>
      <p className="articleComments">Comments: {comment_count}</p>
    </section>
  );
}

export default ArticleCard;
