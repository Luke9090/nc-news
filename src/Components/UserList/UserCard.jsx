import React from 'react';
import defaultAvatar from '../../imgs/defaultAvatar.jpg';
import { Link } from '@reach/router';

function UserCard({ user }) {
  const { username, avatar_url, name } = user;
  const addDefaultAvatar = event => {
    event.target.src = defaultAvatar;
  };
  return (
    <Link to={`/u/${username}`} className="userCard" key={username}>
      <img className="userAvatar" src={avatar_url} alt={`Avatar for ${username}`} onError={addDefaultAvatar} />
      <p className="userUsername">{username}</p>
      <p className="userName">{name}</p>
    </Link>
  );
}

export default UserCard;
