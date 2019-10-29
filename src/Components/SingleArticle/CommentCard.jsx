import React from 'react';
import * as data from '../../utils/data';
import { Link } from '@reach/router';

function CommentCard({ comment, loggedInAs }) {
  const { votes, created_at, author, body } = comment;
  const userIsAuthor = loggedInAs === author;
  return (
    <div className="commentCard">
      <p className="upvote commentUpvote">⬆</p>
      <p className="votes commentVotes">{votes}</p>
      <p className="downvote commentDownvote">⬇</p>
      <Link to={`/u/${author}`} className={`commentAuthor${userIsAuthor ? ' userIsAuthor' : ''}`}>
        <h4>/u/{author}</h4>
      </Link>
      <p className="commentTime">{data.formatTime(created_at)}</p>
      <p className="commentDelete">{userIsAuthor ? <button>Delete</button> : ''}</p>
      <p className="commentBody">{body}</p>
    </div>
  );
}

export default CommentCard;
