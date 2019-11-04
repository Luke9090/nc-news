import React, { PureComponent } from 'react';
import * as data from '../../utils/data';
import * as api from '../../utils/api';
import { Link } from '@reach/router';
import DeletedCard from '../DeletedCard';
import Voter from '../Voter';

class CommentCard extends PureComponent {
  state = {
    deleted: false
  };

  deleteComment = ({ target }) => {
    api.deleteComment(target.id).then(() => {
      this.setState({ deleted: true });
    });
  };

  componentDidMount() {
    this.setState({ comment: this.props.comment });
  }

  render() {
    const { loggedInAs, comment } = this.props;
    const { votes, created_at, author, body, comment_id, article_title, article_id } = comment;
    const userIsAuthor = loggedInAs === author;
    const { deleted } = this.state;

    if (deleted) return <DeletedCard type="Comment" />;
    return (
      <div className="userCommentCard card">
        <Voter votes={votes || 0} id={comment_id} voteCategory="comment" />
        <Link className="commentArticleTitle" to={`/a/${article_id}`}>
          <h4>{article_title}</h4>
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
