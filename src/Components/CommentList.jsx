import React, { PureComponent } from 'react';

class CommentList extends PureComponent {
  state = {
    comments: [],
    isLoading: true
  };

  render() {
    return <p>User comments will live here</p>;
  }
}

export default CommentList;
