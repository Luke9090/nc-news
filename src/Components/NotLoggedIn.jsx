import React from 'react';
import { Link } from '@reach/router';

function NotLoggedIn() {
  return (
    <p className="notLoggedIn">
      <Link to="/login">Log in or create account</Link> to contribute
    </p>
  );
}

export default NotLoggedIn;
