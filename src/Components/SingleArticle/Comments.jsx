import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import Loading from '../Loading';
import CommentCard from './CommentCard';

class Comments extends PureComponent {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    api.fetchArticleComments(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { isLoading, comments } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section id="comments">
        <h3>{comments.length} Comments</h3>
        {comments.map(comment => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
      </section>
    );
  }
}

export default Comments;
