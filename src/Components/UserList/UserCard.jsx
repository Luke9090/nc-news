import React from 'react';
import defaultAvatar from '../../imgs/defaultAvatar.jpg';
import { Link } from '@reach/router';
import commentIcon from '../../imgs/commentIcon.svg';
import articleIcon from '../../imgs/articleIcon.png';

function UserCard({ user }) {
  const { username, avatar_url, name, comment_count, article_count, article_votes, comment_votes } = user;
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
        <img src={articleIcon} alt="Article Icon" className="prefixIcon" />
        <p>{article_count} articles</p>
      </Link>
      <Link className="userCommentCount" to={`/u/${username}/comments`}>
        <img src={commentIcon} alt="Comment Icon" className="prefixIcon" />
        <p>{comment_count} comments</p>
      </Link>
      <p className="score articleScore">{article_votes} article score</p>
      <p className="score commentScore">{comment_votes} comment score</p>
      <p className="score totalScore">{parseInt(comment_votes) + parseInt(article_votes)} total score</p>
    </section>
  );
}

export default UserCard;
