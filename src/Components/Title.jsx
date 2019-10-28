import React from 'react';
import { Link } from '@reach/router';

function Title() {
  const title = '<NC-News />';
  return (
    <header>
      <Link to="/">
        <h1>{title}</h1>
      </Link>
    </header>
  );
}

export default Title;
