import React, { PureComponent } from 'react';
import * as data from '../../utils/data';
import * as api from '../../utils/api';
import { Link } from '@reach/router';
import DeletedCard from '../DeletedCard';

class CommentCard extends PureComponent {
  state = {
    deleted: false,
    comment: {}
  };

  deleteComment = ({ target }) => {
    api.deleteComment(target.id).then(() => {
      this.setState({ deleted: true });
    });
  };

  handleVote = (comment_id, vote) => {
    api.patchCommentVote(comment_id, vote).then(comment => {
      this.setState({ comment });
    });
  };

  componentDidMount() {
    this.setState({ comment: this.props.comment });
  }

  render() {
    const { loggedInAs } = this.props;
    const { votes, created_at, author, body, comment_id } = this.state.comment;
    const userIsAuthor = loggedInAs === author;
    const { deleted } = this.state;

    if (deleted) return <DeletedCard type="Comment" />;
    return (
      <div className="commentCard">
        <p
          className="upvote commentUpvote"
          onClick={() => {
            this.handleVote(comment_id, 1);
          }}
        >
          ⬆
        </p>
        <p className="votes commentVotes">{votes}</p>
        <p
          className="downvote commentDownvote"
          onClick={() => {
            this.handleVote(comment_id, -1);
          }}
        >
          ⬇
        </p>
        <Link to={`/u/${author}`} className={`commentAuthor${userIsAuthor ? ' userIsAuthor' : ''}`}>
          <h4>/u/{author}</h4>
        </Link>
        <p className="commentTime">{data.formatTime(created_at)}</p>
        <p className="commentDelete">
          {userIsAuthor ? (
            <button id={comment_id} onClick={this.deleteComment}>
              Delete
            </button>
          ) : (
            ''
          )}
        </p>
        <p className="commentBody">{body}</p>
      </div>
    );
  }
}

export default CommentCard;
