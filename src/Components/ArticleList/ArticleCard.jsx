import React from 'react';
import { Link } from '@reach/router';
import * as data from '../../utils/data';
import './articleCard.css';

function ArticleCard({ article }) {
  const { author, title, article_id, topic, created_at, votes, comment_count } = article;
  return (
    <section className="articleCard">
      <p className="upvote">⬆</p>
      <p className="articleVotes">{votes}</p>
      <p className="downvote">⬇</p>
      <Link to={`/a/${article_id}`} className="articleTitle">
        <h3>{title}</h3>
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
