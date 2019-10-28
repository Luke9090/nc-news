import React from 'react';

function CommentCard({ comment }) {
  const { votes, created_at, author, body } = comment;
  return (
    <div className="commentCard">
      <p>{body}</p>
    </div>
  );
}

export default CommentCard;
