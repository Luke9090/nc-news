import React from 'react';

function ErrorDisplay({ status = 404, msg = 'Page not found' }) {
  return (
    <section className="error">
      <h2>Error {status}</h2>
      <p>{msg}</p>
    </section>
  );
}

export default ErrorDisplay;
