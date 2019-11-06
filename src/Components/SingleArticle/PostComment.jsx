import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import NotLoggedIn from '../NotLoggedIn';

class PostComment extends PureComponent {
  state = {
    commentInput: ''
  };

  handleChange = event => {
    this.setState({ commentInput: event.target.value });
  };

  handleSubmit = event => {
    const body = this.state.commentInput;
    const article_id = this.props.article_id;
    const username = this.props.loggedInAs;
    event.preventDefault();
    api.postComment(article_id, body, username).then(() => {
      this.props.updateComments();
      this.setState({ commentInput: '' });
    });
  };

  render() {
    const { commentInput } = this.state;
    const { loggedInAs } = this.props;
    if (!loggedInAs) return <NotLoggedIn />;
    return (
      <form id="newCommentForm" onSubmit={this.handleSubmit}>
        <label htmlFor="commentInput">
          <h4>Add to the discussion: </h4>
          <textarea id="commentInput" name="Comment Input" placeholder="Enter comment..." value={commentInput} onChange={this.handleChange} required />
          <button type="submit">Post Comment</button>
          <span>Posting as {loggedInAs}</span>
        </label>
      </form>
    );
  }
}

export default PostComment;
