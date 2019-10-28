import React from 'react';
import { Link } from '@reach/router';

function Menu() {
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/t">Topics</Link>
      <Link to="/u">Users</Link>
    </nav>
  );
}

export default Menu;
