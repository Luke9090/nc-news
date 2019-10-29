import React from 'react';

function DeletedCard({ type }) {
  return <p className="deletionNotice">{type} deleted</p>;
}

export default DeletedCard;
