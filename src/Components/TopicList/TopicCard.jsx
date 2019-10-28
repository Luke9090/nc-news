import React from 'react';
import { Link } from '@reach/router';

function TopicCard({ topic }) {
  return (
    <section className="topicCard">
      <Link to={`/t/${topic.slug}`}>
        <h3>{topic.slug}</h3>
      </Link>
      <p>{topic.description}</p>
    </section>
  );
}

export default TopicCard;
