import React from 'react';
import defaultAvatar from '../../imgs/defaultAvatar.jpg';
import { Link } from '@reach/router';

function UserCard({ user }) {
  const { username, avatar_url, name, comment_count, article_count } = user;
  const addDefaultAvatar = event => {
    event.target.src = defaultAvatar;
  };
  return (
    <section className="userCard card" key={username}>
      <Link className="userAvatar" to={`/u/${username}`}>
        <img src={avatar_url} alt={`Avatar for ${username}`} onError={addDefaultAvatar} />
      </Link>
      <Link className="userUsername" to={`/u/${username}`}>
        <p>{username}</p>
      </Link>
      <Link className="userName" to={`/u/${username}`}>
        <p>{name}</p>
      </Link>
      <Link className="userArticleCount" to={`/u/${username}/articles`}>
        <p>{article_count} articles</p>
      </Link>
      <Link className="userCommentCount" to={`/u/${username}/comments`}>
        <p>{comment_count} comments</p>
      </Link>
    </section>
  );
}

export default UserCard;
