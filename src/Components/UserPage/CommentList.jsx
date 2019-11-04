import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import Loading from '../Loading';
import UserCommentCard from './UserCommentCard';

class CommentList extends PureComponent {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    const { author } = this.props;
    api.fetchUserComments(author).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { isLoading, comments } = this.state;
    const { loggedInAs } = this.props;
    if (isLoading) return <Loading />;
    return comments.map(comment => {
      return <UserCommentCard comment={comment} loggedInAs={loggedInAs} />;
    });
  }
}

export default CommentList;
