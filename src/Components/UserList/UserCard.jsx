import React from 'react';
import defaultAvatar from '../../imgs/defaultAvatar.jpg';

function UserCard({ user }) {
  const { username, avatar_url, name } = user;
  const addDefaultAvatar = event => {
    event.target.src = defaultAvatar;
  };
  return (
    <section className="userCard" key={username}>
      <img src={avatar_url} alt={`Avatar for ${username}`} onError={addDefaultAvatar} />
      <p>{username}</p>
      <p>{name}</p>
    </section>
  );
}

export default UserCard;
