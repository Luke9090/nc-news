import React, { PureComponent } from 'react';
import * as api from '../../utils/api';
import Loading from '../Loading';
import PostComment from './PostComment';
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
    const article_id = this.props.article_id;
    const { isLoading, comments } = this.state;
    if (isLoading) return <Loading />;
    return (
      <section id="comments">
        <h3>{comments.length} Comments</h3>
        {comments.map(comment => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
        <PostComment article_id={article_id} />
      </section>
    );
  }
}

export default Comments;
