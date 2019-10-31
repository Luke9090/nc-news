import React from 'react';

function UserCard({ user }) {
  const { username, avatar_url, name } = user;
  return (
    <section className="userCard" key={username}>
      <img src={avatar_url} alt={`Avatar for ${username}`} />
      <p>{username}</p>
      <p>{name}</p>
    </section>
  );
}

export default UserCard;
